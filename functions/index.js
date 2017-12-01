const functions = require('firebase-functions')
    , admin = require('firebase-admin')
    , lib = require('./lib')
    , nodemailer = require('nodemailer')
    , cookieParser = require('cookie-parser')()
    , validateUser = require('./validate-user')(admin)

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()


exports.joinTripFromInvite = functions.https.onRequest(
    require('express')()
        .use(cookieParser)
        .use(validateUser)
        .param('inviteId', (req, res, next) =>
            db.collection('invites')
                .doc(req.params.inviteId)
                .get()
                .then(invite => {
                    req.invite = invite
                    next()
                })
                .catch(next))
        .use('/api/join/:inviteId', (req, res, next) => {
            const { uid } = req.user;
            const {invite} = req

            if (!invite.exists)
                return res.status(404).send()

            const {tripId} = invite.data();
            db.collection('trips')
                .doc(tripId)
                .update({[`users.${uid}`]: true})
                .then(() => invite.ref.delete() )
                .then(() => res.send({ user: req.user, tripId: tripId }))
                .catch(next)
        }))

exports.bot = functions.firestore
    .document('trips/{tripId}/chat/{messageId}')
    .onCreate(lib.runBotFromMessageEvent());

/* FOR LOCAL TESTING
➜  $ firebase experimental:functions:shell

firebase > bot({from: 'annelise', text: '/search for HI'}, {params: {tripId: '5TT8NzzvNVZAvd8SbEyQ'}})
*/

exports.sendInvite = functions.firestore
    .document('/invites/{inviteId}')
    .onCreate(event => {
        const user = functions.config().gmail.user
            , pass = functions.config().gmail.password
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass }
        });

        var {email, tripName, displayName} = event.data.data();
        var inviteId = event.data.id;

        const mailOptions = {
            from: user, // sender address
            to: email, // list of receivers
            subject: 'You\'ve been invited to join a trip!', // Subject line
            html: `<p>${displayName} invited you to join their trip: ${tripName}</p><p>Go to https://www.triphub.tech/join/${inviteId} to start planning.</p><p>Have a great trip!</p>`// plain text body
        };

        return new Promise((resolve, reject) =>
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {return reject(err)}
                resolve(info)
            }));
    });
