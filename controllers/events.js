const { response } = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name');


    res.json({
        ok: true,
        events
    })
}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventDB = await event.save();

        res.json({
            ok: true,
            event: eventDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Talk to the admin"
        })
    }
}

const updateEvent = async (req, res = response) => {

    const idEvent = req.params.id;
    const uid = req.uid;

    try {

        // Find the event
        const event = await Event.findById(idEvent);

        // Verify if the user exists or send a message
        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'No event exist whit this id'
            });
        }

        // Verify if the user corresponds to the created event
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You don't have editing privileges for this event"
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        // Update event and show
        const updatedEvent = await Event.findByIdAndUpdate(idEvent, newEvent, { new: true });

        res.json({
            ok: true,
            event: updatedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk to the admin"
        })
    };
}

const deleteEvent = async (req, res = response) => {

    const idEvent = req.params.id;
    const uid = req.uid;

    try {

        // Find the event
        const event = await Event.findById(idEvent);

        // Verify if the user exists or send a message
        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'No event exist whit this id'
            });
        }

        // Verify if the user corresponds to the created event
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You don't have editing privileges for this event"
            });
        }

        // Delete event and show 
        await Event.findByIdAndDelete(idEvent);

        res.json({ ok: true, msg: 'Event has been deleted' })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk to the admin"
        })
    };

}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}