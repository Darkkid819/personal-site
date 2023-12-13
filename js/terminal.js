document.addEventListener('click', function(event) {
  const commandInput = document.getElementById('commandInput');
  if (event.target !== commandInput) {
    commandInput.focus();
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  let currentLine = 0;
  const ideContentElement = document.getElementById('ideContent');

  function getFormattedDate() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
    return now.toLocaleDateString('en-US', options) + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function calculateUptime(startYear, startMonth, startDay) {
    const startDate = new Date(startYear, startMonth - 1, startDay); // Month is 0-indexed
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    const m = currentDate.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < startDate.getDate())) {
      years--;
    }
    return years;
  }

  const uptimeYears = calculateUptime(2004, 8, 19);

  const navigatorHelpText = `
<pre>
Commands:
            about
            projects
            socials
            contact
</pre>
`;

const contentArray = [
  {text: "Website login: ", type: false},
  {text: "jordan", type: true},
  {text: "\nPassword: ", type: false},
  {text: "*********", type: true},
  {text: "\nLast Login: " + getFormattedDate(), type: false},
  {text: "\n[jordan@Website ~]# ", type: false},
  {text: "neofetch", type: true},
  {text: `\n<div class="info-container">
              <img src="./images/logo.png" alt="Arch Linux Logo" class="arch-logo">
              <div class="system-info-container">
                  <div class="system-info">
                      jordan@Website<br>
                      --------------<br>
                      OS: v2004.08.19<br>
                      Host: Suffolk County Community College<br>
                      Uptime: ${uptimeYears} Years<br>
                      Shell: bash-my-head-against-the-keyboard<br>
                      Terminal: IRL<br>
                      CPU: Caffeinated Thinker<br>
                      GPU: FP32 Bit Level Hacking<br>
                      Memory: Infinite Jest Storage
                  </div>
                  <div class="color-bars">
                      <div class="color-bar" style="background-color: #e74c3c;"></div>
                      <div class="color-bar" style="background-color: #2ecc71;"></div>
                      <div class="color-bar" style="background-color: #3498db;"></div>
                      <div class="color-bar" style="background-color: #9b59b6;"></div>
                      <div class="color-bar" style="background-color: #f1c40f;"></div>
                      <div class="color-bar" style="background-color: #e67e22;"></div>
                      <div class="color-bar" style="background-color: #1abc9c;"></div>
                      <div class="color-bar" style="background-color: #ecf0f1;"></div>
                  </div>
              </div>
          </div>` + "\n[jordan@website ~]# ", type: false},
  {text: "help", type: true},
  {text: "", type: false, isLast: true}
];



  function typeText() {
      if (contentArray[currentLine].type) {
          let textIndex = 0;
          function typeChar() {
              ideContentElement.innerHTML += contentArray[currentLine].text[textIndex];
              textIndex++;
              if (textIndex < contentArray[currentLine].text.length) {
                  setTimeout(typeChar, Math.random() * 50 + 25);
              } else {
                  if (currentLine + 1 < contentArray.length && !contentArray[currentLine + 1].type) {
                      ideContentElement.innerHTML += '<br>';
                  }
                  currentLine++;
                  setTimeout(processLine, 500);
              }
          }
          typeChar();
      } else {
          ideContentElement.innerHTML += contentArray[currentLine].text;
          if (contentArray[currentLine].isLast) {
            appendCommandInputArea();
          } else {
            if (currentLine + 1 < contentArray.length && contentArray[currentLine + 1].type) {
                ideContentElement.innerHTML += ' '; 
            } else {
                ideContentElement.innerHTML += '<br>';
            }
          }
          currentLine++;
          setTimeout(processLine, 500);
      }
  }

  function processLine() {
    if (currentLine < contentArray.length) {
      if (contentArray[currentLine].isLast) {
        ideContentElement.innerHTML += "<br>" + navigatorHelpText + "<br>" + contentArray[currentLine].text;
        appendCommandInputArea();
        currentLine++;
      } else {
        typeText();
      }
    }
  }

  function appendCommandInputArea() {
    const commandInputHTML = `
      <div id="commandInputArea">
        <span id="inputPrompt">[jordan@website ~]# </span>
        <input type="text" id="commandInput" spellcheck="false" autofocus />
      </div>
    `;
    ideContentElement.innerHTML += commandInputHTML;
  
    const commandInput = document.getElementById('commandInput');
    const contentPanel = document.getElementById('contentPanel');
    commandInput.focus();
  
    commandInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const command = commandInput.value.trim();
        commandInput.value = ''; // Clear the input after executing the command
        switch (command.toLowerCase()) {
          case 'about':
            contentPanel.innerHTML = `
            <p id="aboutSection">I'm Jordan Mitacek, a passionate Computer Science student at Suffolk County Community College, driven by a love for learning and a knack for creating innovative solutions. My journey is about transforming curiosity into real-world applications, one project at a time. My goal? To learn by doing and build cool stuff along the way.</p>`;
            break;
          case 'projects':
            const projects = [
              { name: 'Tetris', url: 'https://github.com/Darkkid819/tetris' },
              { name: 'Game of Life', url: 'https://github.com/Darkkid819' },
              { name: 'AsciiPy', url: 'https://github.com/Darkkid819' },
              { name: 'AutoPy', url: 'https://github.com/Darkkid819' },
              { name: 'DoomPy', url: 'https://github.com/Darkkid819' },
              { name: 'CapturePy', url: 'https://github.com/Darkkid819' },
              { name: 'ft tracker', url: 'https://github.com/Darkkid819' },
              { name: 'Course Assigner', url: 'https://github.com/Darkkid819/Course-Assigner' },
              { name: 'WordWeaver', url: 'https://github.com/Darkkid819/WordWeaver' },
              { name: 'JStocks', url: 'https://github.com/Darkkid819' }
              // Add more projects here...
            ];
            let projectListHTML = '<div id="projectList">';
            projects.forEach(project => {
              projectListHTML += `<div class="projectItem"><a href="${project.url}" target="_blank">${project.name}</a></div>`;
            });
            projectListHTML += '</div>';
            contentPanel.innerHTML = projectListHTML;
            break;
            case 'socials':
              contentPanel.innerHTML = `
                <div id="socialsSection">
                  <a href="https://github.com/Darkkid819" target="_blank" class="social-btn" id="github"><i class="fab fa-github"></i></a>
                  <a href="https://discordapp.com/users/darkkid819" target="_blank" class="social-btn" id="discord"><i class="fab fa-discord"></i></a>
                  <a href="https://www.youtube.com/@darkkid819" target="_blank" class="social-btn" id="youtube"><i class="fab fa-youtube"></i></a>
                  <a href="https://twitter.com/darkkid819" target="_blank" class="social-btn" id="twitter"><i class="fab fa-twitter"></i></a>
                </div>
              `;
              break;
            case 'contact':
              contentPanel.innerHTML = '<a href="https://docs.google.com/forms/d/e/1FAIpQLSfJrm0OrP5PUEzQXb-vdclbKg0IenL3V6FMB6b2j7yIYdR1aw/viewform?usp=sf_link" target="_blank" class="contact-btn">Contact Form &rarr;</a>';
              break;
        }
      }
    });
  }

  setTimeout(processLine, 2000);
});
