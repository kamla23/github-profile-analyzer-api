import axios from "axios";
import db from "../config/db.js";

//  POST
export const analyzeProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const githubResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const { name, bio, location, public_repos, followers, following } =
      githubResponse.data;

    // bonus feature
    const developerScore = followers * 3 + public_repos * 1;

    const query = `
            INSERT INTO github_profiles (username, name, bio, location, public_repos, followers, following, developer_score)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                name = VALUES(name),
                bio = VALUES(bio),
                location = VALUES(location),
                public_repos = VALUES(public_repos),
                followers = VALUES(followers),
                following = VALUES(following),
                developer_score = VALUES(developer_score);
        `;

    await db.query(query, [
      username,
      name,
      bio,
      location,
      public_repos,
      followers,
      following,
      developerScore,
    ]);

    res.status(200).json({
      message: "Profile analyzed and saved successfully!",
      data: {
        username,
        name,
        bio,
        location,
        public_repos,
        followers,
        following,
        developerScore,
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "GitHub user not found!" });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET  all profile
export const getAllProfiles = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM github_profiles ORDER BY last_analyzed_at DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//  GET  one pfofile
export const getProfileByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM github_profiles WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Profile not found in database!" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
