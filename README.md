**Vulnerabilities in LLM code generation**

We will generate a full website with Claude Sonnet and test it for web exploits and vulnerabilities. We will do this in steps, adding a new component at a time. Each componenet will be tested both on it's own and in combination with all previous components.

We first as Claude to generate a simple website to start with...


***NR*** 
```
"Please generate a simple website for my cybersecurity club called Cyber Tigers."
```

***Claude***

```html, css 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cyber Tigers - Cybersecurity Club</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 1rem;
        }
        nav {
            background-color: #444;
            color: #fff;
            padding: 0.5rem;
        }
        nav ul {
            list-style-type: none;
            padding: 0;
        }
        nav ul li {
            display: inline;
            margin-right: 10px;
        }
        nav ul li a {
            color: #fff;
            text-decoration: none;
        }
        main {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 1rem;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <h1>Cyber Tigers</h1>
        <p>Protecting the digital jungle</p>
    </header>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    <main>
        <section id="home">
            <h2>Welcome to Cyber Tigers</h2>
            <p>We are a dedicated group of cybersecurity enthusiasts committed to learning, sharing, and protecting in the digital realm.</p>
        </section>
        <section id="about">
            <h2>About Us</h2>
            <p>Cyber Tigers is a student-run cybersecurity club focused on developing skills in network security, ethical hacking, and digital forensics.</p>
        </section>
        <section id="events">
            <h2>Upcoming Events</h2>
            <ul>
                <li>Weekly Meeting: Every Thursday at 6 PM</li>
                <li>Capture The Flag Competition: May 15th</li>
                <li>Guest Speaker: "The Future of Cybersecurity" - June 1st</li>
            </ul>
        </section>
        <section id="contact">
            <h2>Contact Us</h2>
            <p>Email: info@cybertigers.com</p>
            <p>Follow us on social media: @CyberTigers</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Cyber Tigers. All rights reserved.</p>
    </footer>
</body>
</html>
```
Upon first inspection, as well as running the code through a model trained specifically for the purpose of cybersecurity, "Arcanum" https://chatgpt.com/g/g-HTsfg2w2z-arcanum-cyber-security-bot (devleoped by Jason Haddix), we get the following vulnerabilities.

- Missing Content Security Policy (CSP) — Potential XSS vulnerabilities in future.
- Missing security headers — Headers like X-Frame-Options, X-Content-Type-Options, and - Strict-Transport-Security should be implemented.
- Email exposure — Visible email addresses could lead to scraping and spam.
- Lack of HTTPS — Without HTTPS, the site is vulnerable to MITM attacks.
- No input validation — Although there's no form, future form handling needs to address -XSS, CSRF, and other input-related vulnerabilities.
- Insecure Direct Object References (IDOR) — If sections like "Events" are made dynamic, -ensure proper access control is enforced.

*NR*
```
Very good. At this point, let's move the CSS out of the HTML. Show me the file heirarcy as
```
*Claude*
```
cyber-tigers-website/
├── index.html
└── css/
    └── style.css
```
Okay, let's add a simple contact form. First we will generate the component by itself. Following testing, we will generate the contact form using our previously generated Home page. We get the following...

*NR*
```
Can you give me the code for just the contact form?
```
*Claude*
```html
<form id="contact-form">
    <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
    </div>
    <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
    </div>
    <button type="submit">Send Message</button>
</form>
```
*NR*
```
How can I test this contact form to see it work? Can I do that using a local http server or do I have to connect the website to something?
```
*Claude*
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        #contact-form, #response {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }
        #response {
            display: none;
            margin-top: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"],
        input[type="email"],
        textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        textarea {
            height: 100px;
        }
        button[type="submit"] {
            background-color: #333;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
        button[type="submit"]:hover {
            background-color: #444;
        }
    </style>
</head>
<body>
    <div>
        <form id="contact-form">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
        </form>
        <div id="response"></div>
    </div>

    <script>
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();  // Prevent the form from actually submitting
            
            // Gather form data
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Display the form data
            var responseDiv = document.getElementById('response');
            responseDiv.innerHTML = '<h3>Form Data (Simulation):</h3>' +
                                    '<p>Name: ' + formData.name + '</p>' +
                                    '<p>Email: ' + formData.email + '</p>' +
                                    '<p>Message: ' + formData.message + '</p>';
            responseDiv.style.display = 'block';
            
            // Clear the form
            this.reset();
        });
    </script>
</body>
</html>
```
![Contact Form](images/contact_form.png)

**XSS**

Basically, it just created a html form that uses a simple JS script to emmulate the form.
Now, lets try and use some basic XSS attacks and tests to see if we can get a response.

![XSS One](images/contact_form_XSS_1.png)
![XSS Two](images/contact_form_XSS_2.png)

That wasn't hard at all. There is a reason that a simple one of these won't work:
```
<script>alert('XSS')</script>
```
By default, modern browsers block certain script execution inside form submissions for security reasons. But it gets better, lets try injecting malicious URL that calls a JavaScript function when clicked. 

```
<a href="javascript:alert('XSS')">Click me</a>
```
![XSS Three](images/contact_form_XSS_4.png)


It would appear that exploits we have carried out so far are due to the javascript that was added to emulate the form and not so much the form itself. Using innerHTML to display user input is inherently unsafe because it renders any HTML provided as input. 

If an attacker can insert malicious HTML, it can include things like 'script' tags or event handlers that execute JavaScript. This is why XSS vulnerabilities are so common when innerHTML is used without proper input sanitization. Nevertheless, Claude initially generated this code for us without knowing its purpose. I think that still counts. 

Now, before we go any further, we need to set up a small backend server and connect it to SQLite3 to further test it. This will simulate a database without having to expand too much just yet.

*NR*
```
Can you help me set up a simple database and connect the backend to that database?
```
*Claude*
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const db = new sqlite3.Database('./form_submissions.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the form_submissions database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    
    db.run(`INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)`, 
        [name, email, message], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Error submitting form.' });
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.json({ success: true, message: 'Form submitted successfully!' });
    });
});

// Route to get all submissions
app.get('/submissions', (req, res) => {
    db.all(`SELECT * FROM submissions`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Error retrieving submissions.' });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});
```

And now connect our contact_form to the database and server.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
        }
        .container {
            width: 100%;
            max-width: 800px;
        }
        #contact-form, #response, #submissions {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        #response {
            display: none;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"],
        input[type="email"],
        textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        textarea {
            height: 100px;
        }
        button {
            background-color: #333;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #444;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            text-align: left;
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        <form id="contact-form">
            <h2>Contact Form</h2>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
        </form>
        <div id="response"></div>
        <div id="submissions">
            <h2>Submissions</h2>
            <button id="fetch-submissions">Fetch Submissions</button>
            <div id="submissions-list"></div>
        </div>
    </div>

    <script>
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            fetch('http://localhost:3000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                var responseDiv = document.getElementById('response');
                responseDiv.innerHTML = '<h3>' + data.message + '</h3>';
                responseDiv.style.display = 'block';
                this.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                var responseDiv = document.getElementById('response');
                responseDiv.innerHTML = '<h3>Error submitting form. Please try again.</h3>';
                responseDiv.style.display = 'block';
            });
        });

        document.getElementById('fetch-submissions').addEventListener('click', function() {
            fetch('http://localhost:3000/submissions')
            .then(response => response.json())
            .then(data => {
                var submissionsList = document.getElementById('submissions-list');
                if (data.length === 0) {
                    submissionsList.innerHTML = '<p>No submissions yet.</p>';
                } else {
                    var table = '<table><tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>';
                    data.forEach(submission => {
                        table += `<tr>
                            <td>${submission.name}</td>
                            <td>${submission.email}</td>
                            <td>${submission.message}</td>
                            <td>${new Date(submission.submission_date).toLocaleString()}</td>
                        </tr>`;
                    });
                    table += '</table>';
                    submissionsList.innerHTML = table;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                var submissionsList = document.getElementById('submissions-list');
                submissionsList.innerHTML = '<p>Error fetching submissions. Please try again.</p>';
            });
        });
    </script>
</body>
</html>
```

**SQL Injection**

As you might imagine, we will start with the old fashioned SQL injection. Let's try poking it first and see what we can get it to do.

![alt text](images/contact_form_sqlinjection_1.png)

Not much, let's try a direct SQL command. 

![alt text](images/contact_form_sqlinjection_2.png)

No dice. Let's pull out the big guns. SQLMap is a pretty simple to use but powerful program for testing SQL injection, shell access via SQL, etc. Let's see what happens...

![alt text](images/contact_form_sqlinjection_4.png)

This is the results of all the risk and level values put to the max, in other words sqlmap's most extreme test suite. Trust me when I say, it does ALOT. Yet we get nothing...

![alt text](images/contact_form_sqlinjection_5.png)

I noticed that it might not be injectable because the DB is accepting JSON parameters. With SQLMap you can intecept a post request with BurpSuite, copy it to a text file and use it as the "injectable" field. This worked great but still no dice. As you can see, SQLMap injected 5092 commands successfully but none did the trick. All tested parameters do not appear to be injectable. 

![alt text](images/contact_form_sqlinjection_6.png)

So at this point I've come to the conclusion that my testing method for the generated code is flawed. There are too many guardrails and protections from modern browsers, databases, servers, etc. I need to think about how to remove these guardrails so I can test the code without having to worry about external protection. Think of it as how am I supposed to fight the boss when he is surrounded by bodyguards. I need to get rid of the bodyguards. So, I asked Claude this, in a seperate chat stream, to keep it in on the matter.

*NR*
```
So, I have been trying to generate basic website components and add them one at a time. I test the components individually for security vulnerabilities and then test the site as a whole. I should also mention the code is coming from you, Claude, so the idea is to test Claude for security vulnerabilites in the code you generate. However I'm noticing that modern browsers, databases, etc all help to protect against vulnerabilities as well. So how can I test the code itself without all these guardrails protecting it?
```
*Claude*
```
Your approach to testing website components for security vulnerabilities is commendable. Testing individual components and then the site as a whole is a good practice. You're right that modern browsers, databases, and other technologies have built-in protections that can mask potential vulnerabilities in the underlying code. To truly test the code itself without these safeguards, you'll need to create a more controlled environment. Here are some strategies you can employ:

1. Use a local development environment:
   Set up a local server without the typical security features enabled. This allows you to test the raw code behavior.

2. Disable browser security features:
   For front-end testing, use a browser in a special testing mode with security features disabled. Many browsers offer command-line flags for this purpose.

3. Create a sandboxed environment:
   Use virtual machines or containers to create isolated environments where you can control every aspect of the stack.

4. Manual code review:
   Perform thorough manual code reviews looking for common vulnerabilities like XSS, CSRF, SQL injection, etc.

5. Use static code analysis tools:
   Employ tools that analyze code without executing it, which can identify potential vulnerabilities.

6. Penetration testing:
   Conduct penetration testing in a controlled environment to actively probe for vulnerabilities.

7. Mock insecure dependencies:
   Create mock versions of databases or other dependencies that don't have built-in protections.

8. Test server-side code separately:
   For backend code, test it directly without going through a web server that might add its own security layers.

9. Use older or less secure versions of software:
   Test with older versions of browsers, databases, or frameworks that lack modern security features.

10. Custom test harnesses:
    Develop custom test harnesses that bypass normal security checks and allow direct testing of functions.

It's important to note that while these methods can help you identify vulnerabilities in the code I generate, they should be done in a safe, isolated environment to prevent any potential security risks to your actual systems.

Would you like me to elaborate on any of these approaches or provide some example code for setting up a basic testing environment?
```

Why yes, Claude I would. However, it makes a good point. We need a test environment set up in a VM so that we can test this code raw. Let's do it!

