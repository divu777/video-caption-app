import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*",
  })
);

mongoose.connect(process.env.MONGODB_URI);

const CaptionSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  captions: [
    {
      text: { type: String, required: true },
      timestamp: { type: Number, required: true },
    },
  ],
});

const Caption = mongoose.model("Caption", CaptionSchema);

app.post("/caption", async (req, res) => {
  const { videoUrl, captions } = req.body;
  try {
    let captionEntry = await Caption.findOne({ videoUrl });
    if (captionEntry) {
      // Update existing captions or add new ones
      captions.forEach((newCaption) => {
        const existingCaption = captionEntry.captions.find(
          (c) => c.timestamp === newCaption.timestamp
        );
        if (existingCaption) {
          existingCaption.text = newCaption.text;
        } else {
          captionEntry.captions.push(newCaption);
        }
      });
    } else {
      // Create a new entry
      captionEntry = new Caption({ videoUrl, captions });
    }
    await captionEntry.save();
    res.json(captionEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/captions/:videoUrl", async (req, res) => {
  const { videoUrl } = req.params;
  try {
    const captionEntry = await Caption.findOne({ videoUrl });
    if (!captionEntry)
      return res.status(404).json({ error: "No captions found" });
    res.json(captionEntry);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "error getting video",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
