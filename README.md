<p class="demoTitle">&nbsp;</p>
<h1>Smart Client Portal with AI-Powered Data Automation</h1>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>Overview</h2>
<p>&nbsp;</p>
<p>This project implements a "Smart Client Portal" that leverages the power of AI-driven data automation to provide dynamic and real-time updates. It allows for seamless control and management of website content and client data through a user-friendly Telegram bot interface. At its core, the system utilizes an AI agent powered by the Google Gemini Chat Model, orchestrated within the N8N automation platform, to interpret user commands from Telegram and translate them into actions that directly manipulate a Google Sheet. This Google Sheet, in turn, serves as a real-time backend for a React-based website dashboard, ensuring instant synchronization of data. Additionally, the system incorporates automated email notifications via Gmail, secured with OAuth 2.0.</p>
<p>The primary goal of this project is to demonstrate a robust and efficient method for:</p>
<ul>
<li>
<p><strong>Real-time Website Updates:</strong> Implementing instant website content changes driven by data modifications in a Google Sheet.</p>
</li>
<li>
<p><strong>Dynamic Client Data Management:</strong> Enabling easy and intuitive updating and retrieval of client data through natural language commands via a Telegram bot.</p>
</li>
<li>
<p><strong>AI-Powered Automation:</strong> Utilizing the Google Gemini Chat Model to understand user intent and automate complex data management tasks.</p>
</li>
<li>
<p><strong>Automated Notifications:</strong> Sending timely email updates based on specific workflow triggers.</p>
</li>
</ul>
<p>&nbsp;</p>
<h2>Project Flow - Detailed Breakdown</h2>
<p>&nbsp;</p>
<p>The entire process from user interaction to website update and potential notification is a cohesive flow managed by the N8N automation platform. Here's a step-by-step breakdown:</p>
<ol start="1">
<li>
<p><strong>Telegram Message Trigger:</strong></p>
<ul>
<li>
<p>The workflow begins when a user sends a message to the designated Telegram bot.</p>
</li>
<li>
<p>The "Telegram Trigger" node in the N8N workflow is configured to listen for new messages sent to this specific bot.</p>
</li>
<li>
<p>Upon receiving a message, the trigger extracts the message content and passes it to the next node in the workflow.</p>
</li>
</ul>
</li>
<li>
<p><strong>AI Agent with Google Gemini Chat Model:</strong></p>
<ul>
<li>
<p>The core of the intelligent automation lies within the "AI Agent" node.</p>
</li>
<li>
<p>This node is configured to communicate with the <strong>Google Gemini Chat Model</strong>. The message received from the Telegram trigger is fed as input to the Gemini model.</p>
</li>
<li>
<p><strong>Natural Language Understanding (NLU):</strong> Gemini processes the text of the Telegram message, understanding the user's intent and extracting relevant information (e.g., the action they want to perform, the data they are referring to). For example, if a user sends "Update John's address to 123 Main St," Gemini will identify the intent as an update, the entity as "John's address," and the new value as "123 Main St."</p>
</li>
</ul>
</li>
<li>
<p><strong>Memory Management (Simple Memory):</strong></p>
<ul>
<li>
<p>The "AI Agent" is connected to a "Simple Memory" node.</p>
</li>
<li>
<p>This allows the AI to retain context from previous interactions within a conversation. This is crucial for handling multi-turn conversations or commands that build upon previous information.</p>
</li>
<li>
<p>The memory can store and retrieve past messages and relevant data points, enabling more coherent and context-aware responses and actions.</p>
</li>
</ul>
</li>
<li>
<p><strong>Tool Selection and Execution:</strong></p>
<ul>
<li>
<p>Based on the Gemini model's understanding of the user's request, the "AI Agent" determines which "Tool" to utilize. These tools are pre-configured functionalities within the N8N workflow that interact with external services. The primary tools implemented in this project are:</p>
<ul>
<li>
<p><strong><code>update rows</code> (Google Sheets):</strong></p>
<ul>
<li>
<p>If the user's intent is to modify data, the AI Agent will select this tool.</p>
</li>
<li>
<p>The Gemini model provides the specific data to be updated (e.g., row identifier, column, new value).</p>
</li>
<li>
<p>The <code>update rows</code> tool then uses the Google Sheets API (authenticated via OAuth 2.0) to directly modify the specified row(s) in the designated Google Sheet. This operation is configured to <code>appendOrUpdate</code> rows based on the identified data.</p>
</li>
</ul>
</li>
<li>
<p><strong><code>GET rows</code> (Google Sheets):</strong></p>
<ul>
<li>
<p>If the user asks for information or a data retrieval operation, the AI Agent selects this tool.</p>
</li>
<li>
<p>The Gemini model might provide parameters for the data to be retrieved (e.g., filter criteria).</p>
</li>
<li>
<p>The <code>GET rows</code> tool uses the Google Sheets API to read data from the specified sheet and passes this information back to the AI Agent for generating a response or further processing.</p>
</li>
</ul>
</li>
<li>
<p><strong><code>Send a message in Gmail</code>:</strong></p>
<ul>
<li>
<p>For scenarios requiring email notifications, the AI Agent can trigger this tool.</p>
</li>
<li>
<p>The content of the email (recipient, subject, body) can be dynamically generated based on the user's request or the outcome of other actions in the workflow.</p>
</li>
<li>
<p>The Gmail API (authenticated via OAuth 2.0) is used to send the email.</p>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>Real-time Website Dashboard Update:</strong></p>
<ul>
<li>
<p>This is a critical aspect of the project and relies on the direct connection between the Google Sheet and the website.</p>
</li>
<li>
<p>The <strong>React-based website dashboard</strong> is designed to continuously monitor and fetch data directly from the same Google Sheet that the N8N workflow interacts with.</p>
</li>
<li>
<p>Utilizing the Google Sheets API on the frontend, the website receives instant updates whenever the data in the sheet is modified by the <code>update rows</code> tool (or even directly by a user with access to the sheet).</p>
</li>
<li>
<p>This creates a seamless real-time synchronization, allowing changes made via the Telegram bot (and processed through the N8N workflow) to be immediately reflected on the website dashboard without manual intervention or delays.</p>
</li>
</ul>
</li>
<li>
<p><strong>Telegram Response:</strong></p>
<ul>
<li>
<p>After the AI Agent has processed the request and the necessary actions (like updating the Google Sheet or sending an email) have been performed, the workflow typically concludes by sending a response back to the user on Telegram.</p>
</li>
<li>
<p>The "Send a text message" node takes the output from the AI Agent (which could be a confirmation message, the retrieved data, or an error notification) and sends it as a direct message to the user who initiated the interaction.</p>
</li>
</ul>
</li>
</ol>
<p>&nbsp;</p>
<h2>Technologies Used</h2>
<p>&nbsp;</p>
<ul>
<li>
<p><strong>N8N:</strong> A powerful and flexible open-source workflow automation platform that orchestrates the entire data flow.</p>
</li>
<li>
<p><strong>Google Gemini Chat Model (via API):</strong> The advanced large language model responsible for understanding user intent and driving the AI automation.</p>
</li>
<li>
<p><strong>Telegram Bot API:</strong> Enables the creation and interaction with the Telegram bot interface.</p>
</li>
<li>
<p><strong>Google Sheets API:</strong> Facilitates programmatic interaction with Google Sheets for reading, writing, and updating data.</p>
</li>
<li>
<p><strong>Gmail API:</strong> Allows the sending of automated emails.</p>
</li>
<li>
<p><strong>OAuth 2.0:</strong> A standard authorization framework used to securely authenticate with Google Sheets and Gmail APIs.</p>
</li>
<li>
<p><strong>React:</strong> A JavaScript library for building the dynamic and real-time website dashboard.</p>
</li>
<li>
<p><strong>REST APIs:</strong> The communication between different components likely utilizes RESTful API principles.</p>
</li>
<li>
<p><strong>Git:</strong> For version control and collaborative development of the project.</p>
</li>
</ul>
<p>&nbsp;</p>
<h2>Key Features Revisited</h2>
<p>&nbsp;</p>
<ul>
<li>
<p><strong>Real-time Website Control via Telegram:</strong> Modify website data and content instantly by interacting with the Telegram bot.</p>
</li>
<li>
<p><strong>Intelligent Data Management:</strong> Leverage the Google Gemini AI to understand natural language commands for complex data operations.</p>
</li>
<li>
<p><strong>Seamless Integration:</strong> N8N acts as the central hub, connecting Telegram, Google AI, Google Sheets, and Gmail into a unified automated system.</p>
</li>
<li>
<p><strong>Automated Notifications:</strong> Keep users informed with timely email updates triggered by specific events within the workflow.</p>
</li>
<li>
<p><strong>Scalable Architecture:</strong> N8N's workflow-based approach allows for easy expansion and addition of new functionalities and integrations.</p>
</li>
</ul>
<p class="demoTitle">&nbsp;&nbsp;&nbsp;&nbsp;</p>
<!-- Comments are visible in the HTML source only -->
