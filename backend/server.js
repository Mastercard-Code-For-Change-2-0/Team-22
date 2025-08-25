const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());

app.use(express.json());   




// ✅ Fix: MongoDB connection string should be inside quotes
mongoose.connect("mongodb://127.0.0.1:27017/donation_matching_portal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// ✅ Fix: fallback port value (5000) if process.env.PORT not set
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
