const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

/*
name: Name des Users
email: Email des Users
pwd: Passwort des Users
blockedPeriods: Die Zeiträume, in denen der User keine Zeit hat -> deswegen werden automatisch alle Veranstaltungen (Events) die hier drin liegen abgelehnt
*/

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    selectedGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    blockedPeriods: [{
        start: {
            type: Date,
            //required: true
        },
        end: {
            type: Date,
            //required: true
        }
    }],
    groups: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],

    confirmation: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],

    disconfirmation: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],

},
{
    //erstellt automatisch createdAt und updatedAt
    timestamps: true
});

// --- Passwort verschlüsseln (Für Sicherheit) ---

// Pre-save Hook: Läuft automatisch VOR dem Speichern
userSchema.pre("save", async function() {
    //nur hashen wenn das Passwort geändert wurde (oder neu ist)
    if (!this.isModified("password")){
        return;
    }
    
    // Salt generieren und Passwort hashen (Standard ist 10 Runden)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// --- Login Hilfsmethode ---
// vergleicht das eingegebene Klartext pwd mit dem Hash in der DB
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};



module.exports = mongoose.model('User', userSchema);