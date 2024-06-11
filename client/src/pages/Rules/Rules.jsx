import { Container, Grid } from '@mantine/core'
import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import './Rules.scss'

function Rules() {
  return (
    <Container >

      <Box style={{ marginTop: "44px", textAlign: "center" }}>
        <i>StudyStream EXISTS because of its Community, and that's you! 😍</i>
        <br />
        <i> Join us in building the most aspirational and supportive community on Earth. Together, we have the power to encourage and inspire each other to achieve our goals 🌎 </i>
      </Box>
      <Box sx={{ lineHeight: "30px" }}>
        <h1>🙌🏼 Community Guidelines</h1>
        <ul style={{ listStyleType: "circle" }}>
          <li><strong>🤝 We're here to help</strong>  The StudyStream team is authorized to enforce its rules at all times. </li>
          <li><strong>☀️ Respect & Good Vibes:</strong>  Be open-minded and kind to help create a positive atmosphere. </li>
          <li><strong>🦜 If you see something, say something:</strong></li>
          <li><strong>🦸🏻‍♀️ Manage your own experience:</strong>  Block users or hide their video streams if necessary. </li>
          <li><strong>🔒 Safety:</strong> Do not disclose personal information that may compromise your privacy or security.</li>
        </ul>
      </Box>
      <Box sx={{ lineHeight: "30px" }}>
        <h1>📝 General Rules</h1>
        <ol>
          <li>
            <strong>👍🏻 Appropriate etiquette:</strong>
            No inappropriate or offensive usernames, profile pictures or biography descriptions.
          </li>
          <li>
            <strong>🎂 Age limit:</strong>
            StudyStream is only accessible to users aged 16 and above.
          </li>
          <li>
            <strong>⛔ Consent:</strong>
            Do not share information about other users without their explicit consent.
          </li>
          <li>
            <strong>❌ No harassment:</strong>
            No abuse of any form including insults, threats, bullying, trolling or personal attacks towards others.
          </li>
          <li>
            <strong>😖 No discrimination:</strong>
            No incitement, prejudiced treatment or hatred of others based on protected characteristics (such as race, gender, age, sexual orientation, religion, nationality, disability, etc).
          </li>
          <li>
            <strong>📵 No NSFW content:</strong>
            No offensive, disturbing, or sexually explicit content. No content related to violence, weapons, or recreational drugs.
          </li>
          <li>
            <strong>🙅🏼‍♂️ No avoidance:</strong>
            Creating multiple accounts to evade penalties is strictly prohibited.
          </li>
          <li>
            <strong>🔇 No promotion:</strong>
            Do not promote or advertise, directly or indirectly, without permission.
          </li>
          <li>
            <strong>🙈 No impersonation:</strong>
            Do not pretend to be someone else.
          </li>
          <li>
            <strong>🎭 No misusing the report system:</strong>
            Do not submit fake reports, or make false allegations against others.
          </li>
        </ol>
      </Box>
      <Box sx={{ lineHeight: "30px" }}>
        <h1>⏲ Focus Room Rules</h1>
        <ol start={11}>
          <li>
            <strong>📹 Video conduct:</strong>
            Avoid intentionally distracting, inappropriate, disruptive, and offensive behavior and presentation. This includes clothing, backgrounds, filters, tile messages, and audio (where it's available).
          </li>
        </ol>
      </Box>
      <Box sx={{ lineHeight: "30px" }}>
        <h1>💬 Chat Rules</h1>
        <ol start={12}>
          <li>
            <strong>🙊 No inappropriate messaging:</strong>  No unwelcome, spamming, or 'creeping' messages. No profanity.
          </li>
          <li>
            <strong>🌎 Language: </strong>
            Please use English in all public spaces unless stated otherwise in designated spaces.
          </li>
        </ol>
      </Box>
      <Box>
        <i>
          <strong>👋🏻 Talk to us:</strong>
          To speak to the moderation team or query a moderation decision, please email
        </i>
        <br />
        <i>
          <strong>✋🏼 Disclaimer: </strong>
          Moderators reserve the right to modify rules and exercise any moderation action deemed necessary at all times.
        </i>
      </Box>
      <Box >
        <h1>🧷 Staying Safe: How to Hide, Block, and Report</h1>
        <p> 👋🏻 To report an issue, click the 'Report an Issue' button on the homepage, or email   </p>
        <Box sx={{ border: "1px solid black" }}>
          {/* Row 1 */}
          <Grid container spacing={2} className="row" sx={{ marginBottom: "1rem", width: "100%" }}>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box>
                <strong>Stay Safe</strong>
              </Box>
            </Grid>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box>
                <strong>Hide/Block/Report</strong>
              </Box>
            </Grid>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box>
                <strong>How?</strong>
              </Box>
            </Grid>
          </Grid>
          {/* Row 2 */}
          <Grid container spacing={2} className="row" sx={{ marginBottom: "1rem" }}>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box sx={{ padding: 4, borderRight: "1px solid black", borderBottom: "1px solid black" }}>
                If you find another user <strong>distracting</strong> or <strong>annoying</strong> in the Focus Room
              </Box>
            </Grid>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box sx={{ padding: 4, borderRight: "1px solid black", borderBottom: "1px solid black" }}>
                <strong>'Hide'</strong> them to:
                <ul>
                  <li>Remove them from your view in the Focus Room</li>
                </ul>
                <i>Note: They will still be able to see you in the Focus Room</i>
              </Box>
            </Grid>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box sx={{ padding: 4, borderBottom: "1px solid black" }}>
                'Hide' buttons can be found:
                <ul>
                  <li>In the Focus Room by hovering over a user's video tile and clicking the three dots</li>
                </ul>
              </Box>
            </Grid>
          </Grid>

          {/* Row 2 */}
          <Grid container spacing={2} className="row" sx={{ marginBottom: "1rem" }}>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box sx={{ padding: 4, borderRight: "1px solid black", borderBottom: "1px solid black" }}>
                If you find another user <strong>distracting</strong> or <strong>annoying</strong> anywhere on the platform
              </Box>
            </Grid>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box sx={{ padding: 4, borderRight: "1px solid black", borderBottom: "1px solid black" }}>
                <strong>'Block'</strong> them to:
                <ul>
                  <li>Remove them from your view in the Focus Room</li>
                  <li>Prevent them from seeing you in the Focus Room</li>
                  <li>Stop them from finding you in the search, or from messaging you</li>
                </ul>
              </Box>
            </Grid>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box sx={{ padding: 4, borderBottom: "1px solid black" }}>
                'Block' buttons can be found:
                <ul>
                  <li>On user profiles, mini-bio, and chats</li>
                  <li>In the Focus Room by hovering over a user's video tile and clicking the three dots</li>
                </ul>
              </Box>
            </Grid>
          </Grid>

          {/* Row 3 */}
          <Grid container spacing={2} className="row">
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box sx={{ padding: 4, borderRight: "1px solid black" }}>
                If you see another user <strong>break</strong> a Community Rule
              </Box>
            </Grid>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box sx={{ padding: 4, borderRight: "1px solid black" }}>
                <strong>'Report'</strong> them to:
                <ul>
                  <li>Submit a complaint to our moderator team</li>
                </ul>
                <i>Note: The person you report will not know who reported them</i>
              </Box>
            </Grid>
            <Grid item xs={4} className="cell" sx={{ width: "30.33%", padding: "20px" }}>
              <Box sx={{ padding: 4 }}>
                'Report' buttons can be found:
                <ul>
                  <li>On user profiles, mini-bio, and chats</li>
                  <li>In the Focus Room by hovering over a user's video tile and clicking the three dots</li>
                </ul>
              </Box>
            </Grid>
          </Grid>

        </Box>



      </Box>
    </Container >
  )
}

export default Rules