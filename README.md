<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Client Portal with AI-Powered Data Automation - README</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
            line-height: 1.6;
            color: #24292e;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2, h3 {
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
        }
        h1 {
            font-size: 2em;
        }
        h2 {
            font-size: 1.5em;
        }
        h3 {
            font-size: 1.25em;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 20px;
            background-color: #f6f8fa;
            color: #586069;
            font-size: 12px;
            font-weight: 600;
            margin-right: 5px;
            text-decoration: none;
        }
        .badge-n8n { background-color: #7b42ff; color: white; }
        .badge-oauth { background-color: #3f8636; color: white; }
        .badge-react { background-color: #61DAFB; color: #20232a; }
        .badge-rest { background-color: #f6d145; color: #20232a; }
        .badge-git { background-color: #F05032; color: white; }
        ul, ol {
            padding-left: 20px;
        }
        li {
            margin-bottom: 8px;
        }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        p {
            margin-bottom: 16px;
        }
        pre {
            background-color: #f6f8fa;
            border-radius: 3px;
            padding: 16px;
            overflow: auto;
            line-height: 1.45;
        }
    </style>
</head>
<body>

    <h1>Smart Client Portal with AI-Powered Data Automation</h1>

    <p>
        <a href="https://n8n.io/" class="badge badge-n8n">Built with N8N</a>
        <a href="https://oauth.net/2/" class="badge badge-oauth">Authentication: OAuth 2.0</a>
        <a href="https://react.dev/" class="badge badge-react">Frontend: React</a>
        <a href="https://restfulapi.net/" class="badge badge-rest">API: RESTful APIs</a>
        <a href="https://git-scm.com/" class="badge badge-git">Version Control: Git</a>
    </p>

    <h2>Overview</h2>
    <p>This project implements a "Smart Client Portal" that leverages the power of AI-driven data automation to provide dynamic and real-time updates. It allows for seamless control and management of website content and client data through a user-friendly Telegram bot interface. At its core, the system utilizes an AI agent powered by the Google Gemini Chat Model, orchestrated within the N8N automation platform, to interpret user commands from Telegram and translate them into actions that directly manipulate a Google Sheet. This Google Sheet, in turn, serves as a real-time backend for a React-based website dashboard, ensuring instant synchronization of data. Additionally, the system incorporates automated email notifications via Gmail, secured with OAuth 2.0.</p>

    <p>The primary goal of this project is to demonstrate a robust and efficient method for:</p>
    <ul>
        <li><strong>Real-time Website Updates:</strong> Implementing instant website content changes driven by data modifications in a Google Sheet.</li>
        <li><strong>Dynamic Client Data Management:</strong> Enabling easy and intuitive updating and retrieval of client data through natural language commands via a Telegram bot.</li>
        <li><strong>AI-Powered Automation:</strong> Utilizing the Google Gemini Chat Model to understand user intent and automate complex data management tasks.</li>
        <li><strong>Automated Notifications:</strong> Sending timely email updates based on specific workflow triggers.</li>
    </ul>

    <h2>Project Flow - Detailed Breakdown</h2>
    <p>The entire process from user interaction to website update and potential notification is a cohesive flow managed by the N8N automation platform. Here's a step-by-step breakdown:</p>

    <ol>
        <li><strong>Telegram Message Trigger:</strong>
            <ul>
                <li>The workflow begins when a user sends a message to the designated Telegram bot.</li>
                <li>The "Telegram Trigger" node in the N8N workflow is configured to listen for new messages sent to this specific bot.</li>
                <li>Upon receiving a message, the trigger extracts the message content and passes it to the next node in the workflow.</li>
            </ul>
        </li>
        <li><strong>AI Agent with Google Gemini Chat Model:</strong>
            <ul>
                <li>The core of the intelligent automation lies within the "AI Agent" node.</li>
                <li>This node is configured to communicate with the <strong>Google Gemini Chat Model</strong>. The message received from the Telegram trigger is fed as input to the Gemini model.</li>
                <li><strong>Natural Language Understanding (NLU):</strong> Gemini processes the text of the Telegram message, understanding the user's intent and extracting relevant information (e.g., the action they want to perform, the data they are referring to). For example, if a user sends "Update John's address to 123 Main St," Gemini will identify the intent as an update, the entity as "John's address," and the new value as "123 Main St."</li>
            </ul>
        </li>
        <li><strong>Memory Management (Simple Memory):</strong>
            <ul>
                <li>The "AI Agent" is connected to a "Simple Memory" node.</li>
                <li>This allows the AI to retain context from previous interactions within a conversation. This is crucial for handling multi-turn conversations or commands that build upon previous information.</li>
                <li>The memory can store and retrieve past messages and relevant data points, enabling more coherent and context-aware responses and actions.</li>
            </ul>
        </li>
        <li><strong>Tool Selection and Execution:</strong>
            <p>Based on the Gemini model's understanding of the user's request, the "AI Agent" determines which "Tool" to utilize. These tools are pre-configured functionalities within the N8N workflow that interact with external services. The primary tools implemented in this project are:</p>
            <ul>
                <li><strong><code>update rows</code> (Google Sheets):</strong>
                    <ul>
                        <li>If the user's intent is to modify data, the AI Agent will select this tool.</li>
                        <li>The Gemini model provides the specific data to be updated (e.g., row identifier, column, new value).</li>
                        <li>The <code>update rows</code> tool then uses the Google Sheets API (authenticated via OAuth 2.0) to directly modify the specified row(s) in the designated Google Sheet. This operation is configured to <code>appendOrUpdate</code> rows based on the identified data.</li>
                    </ul>
                </li>
                <li><strong><code>GET rows</code> (Google Sheets):</strong>
                    <ul>
                        <li>If the user asks for information or a data retrieval operation, the AI Agent selects this tool.</li>
                        <li>The Gemini model might provide parameters for the data to be retrieved (e.g., filter criteria).</li>
                        <li>The <code>GET rows</code> tool uses the Google Sheets API to read data from the specified sheet and passes this information back to the AI Agent for generating a response or further processing.</li>
                    </ul>
                </li>
                <li><strong><code>Send a message in Gmail</code>:</strong>
                    <ul>
                        <li>For scenarios requiring email notifications, the AI Agent can trigger this tool.</li>
                        <li>The content of the email (recipient, subject, body) can be dynamically generated based on the user's request or the outcome of other actions in the workflow.</li>
                        <li>The Gmail API (authenticated via OAuth 2.0) is used to send the email.</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li><strong>Real-time Website Dashboard Update:</strong>
            <ul>
                <li>This is a critical aspect of the project and relies on the direct connection between the Google Sheet and the website.</li>
                <li>The <strong>React-based website dashboard</strong> is designed to continuously monitor and fetch data directly from the same Google Sheet that the N8N workflow interacts with.</li>
                <li>Utilizing the Google Sheets API on the frontend, the website receives instant updates whenever the data in the sheet is modified by the <code>update rows</code> tool (or even directly by a user with access to the sheet).</li>
                <li>This creates a seamless real-time synchronization, allowing changes made via the Telegram bot (and processed through the N8N workflow) to be immediately reflected on the website dashboard without manual intervention or delays.</li>
            </ul>
        </li>
        <li><strong>Telegram Response:</strong>
            <ul>
                <li>After the AI Agent has processed the request and the necessary actions (like updating the Google Sheet or sending an email) have been performed, the workflow typically concludes by sending a response back to the user on Telegram.</li>
                <li>The "Send a text message" node takes the output from the AI Agent (which could be a confirmation message, the retrieved data, or an error notification) and sends it as a direct message to the user who initiated the interaction.</li>
            </ul>
        </li>
    </ol>

    <h2>Technologies Used</h2>
    <ul>
        <li><strong>N8N:</strong> A powerful and flexible open-source workflow automation platform that orchestrates the entire data flow.</li>
        <li><strong>Google Gemini Chat Model (via API):</strong> The advanced large language model responsible for understanding user intent and driving the AI automation.</li>
        <li><strong>Telegram Bot API:</strong> Enables the creation and interaction with the Telegram bot interface.</li>
        <li><strong>Google Sheets API:</strong> Facilitates programmatic interaction with Google Sheets for reading, writing, and updating data.</li>
        <li><strong>Gmail API:</strong> Allows the sending of automated emails.</li>
        <li><strong>OAuth 2.0:</strong> A standard authorization framework used to securely authenticate with Google Sheets and Gmail APIs.</li>
        <li><strong>React:</strong> A JavaScript library for building the dynamic and real-time website dashboard.</li>
        <li><strong>REST APIs:</strong> The communication between different components likely utilizes RESTful API principles.</li>
        <li><strong>Git:</strong> For version control and collaborative development of the project.</li>
    </ul>

    <h2>Key Features Revisited</h2>
    <ul>
        <li><strong>Real-time Website Control via Telegram:</strong> Modify website data and content instantly by interacting with the Telegram bot.</li>
        <li><strong>Intelligent Data Management:</strong> Leverage the Google Gemini AI to understand natural language commands for complex data operations.</li>
        <li><strong>Seamless Integration:</strong> N8N acts as the central hub, connecting Telegram, Google AI, Google Sheets, and Gmail into a unified automated system.</li>
        <li><strong>Automated Notifications:</strong> Keep users informed with timely email updates triggered by specific events within the workflow.</li>
        <li><strong>Scalable Architecture:</strong> N8N's workflow-based approach allows for easy expansion and addition of new functionalities and integrations.</li>
    </ul>

    <h2>Getting Started</h2>
    <p><em>(Instructions on how to set up and run the project would typically go here, including prerequisites, installation steps, and configuration details. This would involve setting up the Telegram bot, configuring N8N, creating the Google Sheet, setting up the React website, and handling API authentication.)</em></p>

    <h2>Further Development</h2>
    <p><em>(Potential future enhancements and features would be outlined here.)</em></p>

    <h2>Contributing</h2>
    <p><em>(Guidelines for contributing to the project would be included here.)</em></p>

    <h2>License</h2>
    <p><em>(Information about the project's license would be provided here.)</em></p>

</body>
</html>
