// script.js — Complete Survey Code

function renderThankYouPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="max-w-2xl mx-auto p-10 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl text-center">
      <h2 class="text-3xl font-bold text-green-800 mb-6">Thank You!</h2>
      <p class="text-lg text-green-900 leading-relaxed mb-6">
        Your time and insights are truly appreciated. Your contribution will help promote a safer, healthier, and more supportive work environment for seafarers around the world.
      </p>
      <p class="text-xl font-semibold text-green-900">Stay safe and sail well!<br/>Capt Jas</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderIntroPage();
});

const surveyData = {
  rank: "",
  shipType: "",
  nationality: "",
  age: "",
  experience: "",
  company: "",

  // Section 1: OSI
  osiResponsesRaw: [],
  osiResponsesScored: [],
  osiTotal: 0,

  // Section 2: Fatigue
  fatigueResponses: [],
  fatigueTotal: 0,
  fatigueLevel: "",

  // Section 3: Psychological Safety Scale
  psychSafetyScaleResponses: [],
  psychSafetyScaleTotal: 0,
  psychSafetyIndividual: 0,
  psychSafetyTeamRespect: 0,
  psychSafetyTeamLearning: 0,
  psychSafetyLevel: "",
  psychSafetyIndividualLevel: "",
  psychSafetyTeamRespectLevel: "",
  psychSafetyTeamLearningLevel: "",

  // Section 4: Open-ended / wellbeing
  support: {},
  communication: {},
  psychologicalSafety: {}
};

function renderIntroPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="relative w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10 rounded-2xl shadow-2xl space-y-6">
      <h1 class="text-3xl font-extrabold text-center text-blue-900">Dear Seafarer Colleagues,</h1>
      <p class="text-lg text-blue-900 leading-relaxed">
        I hope you're well. As a fellow mariner and a psychology student, I’m conducting a research study on occupational stress, fatigue, and psychological safety at sea.
      </p>
      <p class="text-lg text-blue-900 leading-relaxed">
        Life on board demands <b> resilience and high performance </b>, but long hours, isolation, and constant pressure can take a toll. This study explores how psychological safety—the freedom to speak up, seek help, and make mistakes without fear—impacts our stress and fatigue levels.
      </p>
      <p class="text-lg text-blue-900 leading-relaxed">
        The survey is <b> anonymous </b> and takes just a few minutes. Your insights will help us better understand crew welfare and create an environment that will better support a healthier, more sustainable work environment.
      </p>
      <p class="text-lg font-semibold text-blue-950">Fair winds and following seas,</p>
      <p class="text-lg font-semibold text-blue-900"> <br/>Capt Jaspreet Singh Puri (JAS),<br> Master Mariner</br></p>
      <div class="text-center">
        <button onclick="renderInfoPage()" class="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md transition">Start Survey</button>
      </div>
    </div>
  `;
}

function renderInfoPage() {
  const app = document.getElementById("app");

  const ranks = [
    "Capt",
    "Ch. Officer",
    "2nd Officer",
    "3rd Officer",
    "Ch. Eng",
    "2nd Eng",
    "3rd Eng",
    "4th Eng",
    "A.B",
    "O.S",
    "MTM",
    "Wiper",
    "Others"
  ];

  app.innerHTML = `
    <div class="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-10 rounded-2xl shadow-2xl">
      <h2 class="text-2xl font-bold text-teal-800 mb-6">Basic Information</h2>
      <form id="infoForm" class="space-y-6">

        <div>
          <label class="block text-lg font-medium text-blue-900 mb-1">Rank</label>
          <select id="rankSelect" name="rank" required class="w-full border border-blue-300 px-4 py-3 rounded-lg bg-white">
            <option value="" disabled selected>Select your rank</option>
            ${ranks.map(r => `<option value="${r}">${r}</option>`).join("")}
          </select>
        </div>

        <div id="rankOtherWrapper" class="hidden">
          <label class="block text-lg font-medium text-blue-900 mb-1">Please specify your rank</label>
          <input id="rankOther" type="text" name="rankOther" class="w-full border border-blue-300 px-4 py-3 rounded-lg bg-white" placeholder="Type your rank" />
        </div>

        <div>
          <label class="block text-lg font-medium text-blue-900 mb-1">Type of Ship</label>
          <input type="text" name="shipType" required class="w-full border border-blue-300 px-4 py-3 rounded-lg bg-white" placeholder="e.g., Container, Tanker, Bulk, Offshore" />
        </div>

        <div>
          <label class="block text-lg font-medium text-blue-900 mb-1">Nationality</label>
          <input type="text" name="nationality" required class="w-full border border-blue-300 px-4 py-3 rounded-lg bg-white" />
        </div>

        <div>
          <label class="block text-lg font-medium text-blue-900 mb-1">Age</label>
          <input type="number" name="age" required class="w-full border border-blue-300 px-4 py-3 rounded-lg bg-white" />
        </div>

        <div>
          <label class="block text-lg font-medium text-blue-900 mb-1">Years of Experience</label>
          <input type="number" name="experience" required class="w-full border border-blue-300 px-4 py-3 rounded-lg bg-white" />
        </div>

        <div>
          <label class="block text-lg font-medium text-blue-900 mb-1">Company (current or last sailed with)</label>
          <input type="text" name="company" required class="w-full border border-blue-300 px-4 py-3 rounded-lg bg-white" />
        </div>

        <div class="text-center">
          <button type="submit" class="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-semibold">Next</button>
        </div>
      </form>
    </div>
  `;

  const rankSelect = document.getElementById("rankSelect");
  const rankOtherWrapper = document.getElementById("rankOtherWrapper");
  const rankOther = document.getElementById("rankOther");

  rankSelect.addEventListener("change", () => {
    const isOther = rankSelect.value === "Others";
    rankOtherWrapper.classList.toggle("hidden", !isOther);
    rankOther.required = isOther;
    if (!isOther) rankOther.value = "";
  });

  document.getElementById("infoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const selectedRank = (data.get("rank") || "").trim();
    const otherRank = (data.get("rankOther") || "").trim();

    surveyData.rank = selectedRank === "Others" ? otherRank : selectedRank;
    surveyData.shipType = (data.get("shipType") || "").trim();

    surveyData.nationality = (data.get("nationality") || "").trim();
    surveyData.age = data.get("age");
    surveyData.experience = data.get("experience");
    surveyData.company = (data.get("company") || "").trim();

    renderOsiSurvey();
  });
}

function renderOsiSurvey() {
  const osiQuestions = ["I have to do a lot of work in this job", "The available information relating to my job-role and its outcomes are vague and insufficient.", "My different Officers often give contradictory instructions regarding my works.", "Sometimes it becomes complied problem for me to make adjustment between political/group pressures and formal rules and instructions.", "The responsibility for the efficiency and productivity of many employees is thrust upon me.", "Most of my suggestions are heeded and implemented here.", "My decisions and instructions concerning distribution of assignments among employees are properly followed.", "I have to work with persons whom I like.", "My assignments are of monotonous nature.", "Higher authorities do care for my self respect.", "I get less salary in comparison to the quantum of my labour/work.", "I do my work under tense circumstances.", "Owing to excessive work load I have to manage with insufficient number of employees and resources.", "The objectives of my work-role are quiet clear and adequately planned", "Officials do not interfere with my jurisdiction and working methods.", "I have to do some work unwillingly owing to certain group or political pressures.", "I am responsible for the future of a number of employees.", "My co-operation is frequently sort in solving the administrative or industrial problems at higher level.", "My suggestions regarding the training programs of employees are given due significance.", "Some of my colleagues and subordinates try to defame and malign me as unsuccessful.", "I get ample opportunity to utilize my abilities and experience independently.", "This job has enhance my social status.", "I am seldom rewarded for my hard labour and efficient performance.", "Some of my assignments are quite risky and complicated.", "I have to dispose of my work hurriedly owing to excessive work load.", "I am unable to perform my duties smoothly owing to uncertainty and ambiguity of the scope of my jurisdiction and authorities.", "I am not provided with clear instructions and sufficient facilities regarding the new assignments trusted to me.", "In order to maintain group conformity sometimes I have to do/produce more than usual.", "I bear the great responsibility for the progress and prosperity of this organization.", "My opinions are sought in framing important policies of the Organization/Department.", "Our interest and opinions are duly considered in making appointments for important post.", "My colleagues do cooperate with me voluntarily in solving administrative and industrial problems", "I get ample opportunity to develop my aptitude and proficiency properly.", "My higher authorities do not give due significance to my post and work.", "I often feel that this job has made my life cumbersome", "Being too busy with official work I am not able to devote sufficient time to my domestic and personal problems.", "It is not clear that what type of work and behaviour my higher authorities and colleagues expect from me.", "Employees attach due importance to the official instructions and formal working procedures.", "I am compelled to violate the formal and administrative procedures and policies owing to group/political pressures.", "My opinion is sought in changing or modifying the working system, instrument and conditions.", "There exists sufficient mutual co-operation and team-spirit among the employees of this Organization/Department.", "My suggestions and cooperation are not sought in solving even those problems for which I am quite competent.", "Working conditions are satisfactory here from the point of view of our welfare and convenience.", "I have to do such work as ought to be done by others.", "It becomes difficult to implement all of a sudden the new dealing procedures and policies in place of those already in practice.", "I am unable to carry out my assignment to my satisfaction on account of excessive load of work and lack of time."];
  const falseKeyed = [6, 7, 8, 10, 14, 15, 18, 19, 21, 22, 30, 31, 32, 33, 38, 40, 41, 43]; // 1-based item numbers

  const osiLabels = ["Strongly Disagree", "Disagree", "Uncertain", "Agree", "Strongly Agree"]; // 1..5

  const section = osiQuestions.map((q, i) => `
    <div class="bg-white/70 p-5 rounded-xl shadow-md">
      <p class="font-semibold text-blue-900 mb-3">${i + 1}. ${q}</p>
      <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
        ${osiLabels.map((label, val) => `
          <label class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-blue-200 hover:border-teal-400 cursor-pointer">
            <input type="radio" name="osi${i}" value="${val + 1}" required />
            <span class="text-sm text-blue-900">${label}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-10 rounded-2xl shadow-2xl">
      <h2 class="text-2xl font-bold text-teal-800 mb-2">Section 1: Occupational Stress Index (OSI)</h2>
      <p class="text-blue-900 mb-6">Please select the option that best reflects your experience.</p>

      <form id="osiForm" class="space-y-6">
        ${section}
        <div class="text-center pt-4">
          <button type="submit" class="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-semibold">
            Continue to Fatigue Assessment
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("osiForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    // Reset to avoid duplicates
    surveyData.osiResponsesRaw = [];
    surveyData.osiResponsesScored = [];

    for (let i = 0; i < osiQuestions.length; i++) {
      const raw = Number(form.get(`osi${i}`));
      surveyData.osiResponsesRaw.push(raw);

      // Reverse-score false keyed items
      const itemNo = i + 1;
      const scored = falseKeyed.includes(itemNo) ? (6 - raw) : raw;
      surveyData.osiResponsesScored.push(scored);
    }

    surveyData.osiTotal = surveyData.osiResponsesScored.reduce((a, b) => a + b, 0);
    renderFatigueSurvey();
  });
}

function renderFatigueSurvey() {
  const fatigueQuestions = ["I often feel physically tired.", "I often have difficulty concentrating.", "I often experience mood swings or irritability.", "I often find it challenging to stay focused on tasks.", "I often feel drowsy or sleepy during the day."];
  const fatigueLabels = ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]; // 1..5

  const section = fatigueQuestions.map((q, i) => `
    <div class="bg-white/70 p-5 rounded-xl shadow-md">
      <p class="font-semibold text-blue-900 mb-3">${i + 1}. ${q}</p>
      <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
        ${fatigueLabels.map((label, val) => `
          <label class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-blue-200 hover:border-teal-400 cursor-pointer">
            <input type="radio" name="fatigue${i}" value="${val + 1}" required />
            <span class="text-sm text-blue-900">${label}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-10 rounded-2xl shadow-2xl">
      <h2 class="text-2xl font-bold text-teal-800 mb-2">Section 2: Fatigue</h2>
      <p class="text-blue-900 mb-6">On a scale of 1 to 5, where 1 is "Not at all" and 5 is "Extremely," rate the following statements:</p>

      <form id="fatigueForm" class="space-y-6">
        ${section}
        <div class="text-center pt-4">
          <button type="submit" class="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-semibold">
            Continue to Psychological Safety
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("fatigueForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    surveyData.fatigueResponses = [];
    for (let i = 0; i < fatigueQuestions.length; i++) {
      surveyData.fatigueResponses.push(Number(form.get(`fatigue${i}`)));
    }

    const total = surveyData.fatigueResponses.reduce((a, b) => a + b, 0);
    surveyData.fatigueTotal = total;
    surveyData.fatigueLevel = (total <= 10) ? "Low" : (total <= 15) ? "Moderate" : "High";

    renderPsychSafetySurvey();
  });
}

function renderPsychSafetySurvey() {
  const psychQuestions = ["In this team, it is easy to discuss difficult issues and problems", "I won’t receive retaliation or criticism if I admit to an error or mistake", "It is easy to ask a member of this team for help", "I feel safe offering new ideas, even if they aren’t fully-formed plans", "In this team, people are accepted for being different", "My teammates welcome my ideas and give them time and attention", "Members of this team could easily describe the value of others contributions", "In this team, people talk about mistakes and ways to improve and learn from them", "We take time to find new ways to improve our team’s work processes", "Members of this team raise concerns they have about team plans or decisions", "We try to discover our underlying assumptions and seek counterarguments about issues under discussion."];
  const labels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]; // 1..5

  const section = psychQuestions.map((q, i) => `
    <div class="bg-white/70 p-5 rounded-xl shadow-md">
      <p class="font-semibold text-blue-900 mb-3">${i + 1}. ${q}</p>
      <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
        ${labels.map((label, val) => `
          <label class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-blue-200 hover:border-teal-400 cursor-pointer">
            <input type="radio" name="psych${i}" value="${val + 1}" required />
            <span class="text-sm text-blue-900">${label}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-10 rounded-2xl shadow-2xl">
      <h2 class="text-2xl font-bold text-teal-800 mb-2">Section 3: Psychological Safety</h2>
      <p class="text-blue-900 mb-6">Each statement is rated on a 5-point Likert scale.</p>

      <form id="psychForm" class="space-y-6">
        ${section}
        <div class="text-center pt-4">
          <button type="submit" class="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-semibold">
            Continue to Final Section
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("psychForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    surveyData.psychSafetyScaleResponses = [];
    for (let i = 0; i < psychQuestions.length; i++) {
      surveyData.psychSafetyScaleResponses.push(Number(form.get(`psych${i}`)));
    }

    const total = surveyData.psychSafetyScaleResponses.reduce((a, b) => a + b, 0);
    const individual = surveyData.psychSafetyScaleResponses.slice(0, 4).reduce((a, b) => a + b, 0);
    const teamRespect = surveyData.psychSafetyScaleResponses.slice(4, 7).reduce((a, b) => a + b, 0);
    const teamLearning = surveyData.psychSafetyScaleResponses.slice(7, 11).reduce((a, b) => a + b, 0);

    surveyData.psychSafetyScaleTotal = total;
    surveyData.psychSafetyIndividual = individual;
    surveyData.psychSafetyTeamRespect = teamRespect;
    surveyData.psychSafetyTeamLearning = teamLearning;

    // Total interpretation
    surveyData.psychSafetyLevel = (total >= 45) ? "High" : (total >= 35) ? "Moderate" : (total >= 24) ? "Low" : "Very Low";

    // Subscales interpretation
    surveyData.psychSafetyIndividualLevel = (individual >= 16) ? "High" : (individual >= 8) ? "Moderate" : "Low";
    surveyData.psychSafetyTeamRespectLevel = (teamRespect >= 12) ? "High" : (teamRespect >= 7) ? "Moderate" : "Low";

    // Team Learning thresholds same as Individual Safety (max 20)
    surveyData.psychSafetyTeamLearningLevel = (teamLearning >= 16) ? "High" : (teamLearning >= 8) ? "Moderate" : "Low";

    renderFinalSection();
  });
}

function renderFinalSection() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-10">
      <form id="finalForm">

        <section class="p-8 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl shadow">
          <h2 class="text-2xl font-bold text-cyan-900 mb-2">Section 4: General Wellbeing</h2>
          <p class="text-cyan-900 mb-6">Please answer the following questions and add details where applicable.</p>

          <div class="mb-8">
            <p class="text-lg font-semibold text-cyan-900 mb-2">Are you provided adequate support by the management or the company?</p>
            <div class="flex gap-6">
              <label class="flex items-center gap-2"><input type="radio" name="support" value="Yes" required /> Yes</label>
              <label class="flex items-center gap-2"><input type="radio" name="support" value="No" required /> No</label>
            </div>

            <div id="supportFollowup" class="mt-4 hidden">
              <label id="supportFollowupLabel" class="block font-medium text-cyan-900 mb-2"></label>
              <textarea name="supportReason" class="w-full border border-cyan-300 px-4 py-3 rounded-lg bg-white" rows="3" placeholder="Type your answer..."></textarea>
            </div>
          </div>

          <div class="mb-8">
            <p class="text-lg font-semibold text-cyan-900 mb-2">Do you have a good communication with your management/company?</p>
            <div class="flex gap-6">
              <label class="flex items-center gap-2"><input type="radio" name="communication" value="Yes" required /> Yes</label>
              <label class="flex items-center gap-2"><input type="radio" name="communication" value="No" required /> No</label>
            </div>

            <div id="communicationFollowup" class="mt-4 hidden">
              <label id="communicationFollowupLabel" class="block font-medium text-cyan-900 mb-2"></label>
              <textarea name="communicationReason" class="w-full border border-cyan-300 px-4 py-3 rounded-lg bg-white" rows="3" placeholder="Type your answer..."></textarea>
            </div>
          </div>

          <div class="mb-2">
            <p class="text-lg font-semibold text-cyan-900 mb-2">Do you feel psychologically safe to address your concerns to the company/management?</p>
            <div class="flex gap-6">
              <label class="flex items-center gap-2"><input type="radio" name="psychologicalSafety" value="Yes" required /> Yes</label>
              <label class="flex items-center gap-2"><input type="radio" name="psychologicalSafety" value="No" required /> No</label>
            </div>

            <div id="psychSafetyFollowup" class="mt-4 hidden">
              <label id="psychSafetyFollowupLabel" class="block font-medium text-cyan-900 mb-2"></label>
              <textarea name="psychologicalSafetyReason" class="w-full border border-cyan-300 px-4 py-3 rounded-lg bg-white" rows="3" placeholder="Type your answer..."></textarea>
            </div>
          </div>

        </section>

        <div class="text-center">
          <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-lg transition">Submit Survey</button>
        </div>
      </form>
    </div>
  `;

  const form = document.getElementById("finalForm");

  function handleFollowUp(name, yesLabel, noLabel, followupId, labelId) {
    const radios = form.querySelectorAll(`input[name='${name}']`);
    radios.forEach(r => r.addEventListener("change", () => {
      const followup = document.getElementById(followupId);
      const label = document.getElementById(labelId);
      followup.classList.remove("hidden");
      label.textContent = (r.value === "Yes") ? yesLabel : noLabel;
    }));
  }

  handleFollowUp(
    "support",
    "Yes – List the kind of support provided?",
    "No – List the main cause of not getting proper that support?",
    "supportFollowup",
    "supportFollowupLabel"
  );

  handleFollowUp(
    "communication",
    "Yes – What makes the communication good?",
    "No – What can be done better to increase your interactions with the company/management?",
    "communicationFollowup",
    "communicationFollowupLabel"
  );

  handleFollowUp(
    "psychologicalSafety",
    "Yes – What makes you feel psychologically safe?",
    "No – What can be done better to increase your psychological safety?",
    "psychSafetyFollowup",
    "psychSafetyFollowupLabel"
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    surveyData.support = {
      answer: data.get("support") || "",
      reason: data.get("supportReason") || ""
    };

    surveyData.communication = {
      answer: data.get("communication") || "",
      reason: data.get("communicationReason") || ""
    };

    surveyData.psychologicalSafety = {
      answer: data.get("psychologicalSafety") || "",
      reason: data.get("psychologicalSafetyReason") || ""
    };

    const cleanedData = {
      rank: surveyData.rank || "",
      shipType: surveyData.shipType || "",
      nationality: surveyData.nationality || "",
      age: surveyData.age || "",
      experience: surveyData.experience || "",
      company: surveyData.company || "",

      osiResponsesRaw: Array.isArray(surveyData.osiResponsesRaw) ? surveyData.osiResponsesRaw.map(Number) : [],
      osiResponsesScored: Array.isArray(surveyData.osiResponsesScored) ? surveyData.osiResponsesScored.map(Number) : [],
      osiTotal: Number(surveyData.osiTotal || 0),

      fatigueResponses: Array.isArray(surveyData.fatigueResponses) ? surveyData.fatigueResponses.map(Number) : [],
      fatigueTotal: Number(surveyData.fatigueTotal || 0),
      fatigueLevel: surveyData.fatigueLevel || "",

      psychSafetyScaleResponses: Array.isArray(surveyData.psychSafetyScaleResponses) ? surveyData.psychSafetyScaleResponses.map(Number) : [],
      psychSafetyScaleTotal: Number(surveyData.psychSafetyScaleTotal || 0),
      psychSafetyIndividual: Number(surveyData.psychSafetyIndividual || 0),
      psychSafetyTeamRespect: Number(surveyData.psychSafetyTeamRespect || 0),
      psychSafetyTeamLearning: Number(surveyData.psychSafetyTeamLearning || 0),
      psychSafetyLevel: surveyData.psychSafetyLevel || "",
      psychSafetyIndividualLevel: surveyData.psychSafetyIndividualLevel || "",
      psychSafetyTeamRespectLevel: surveyData.psychSafetyTeamRespectLevel || "",
      psychSafetyTeamLearningLevel: surveyData.psychSafetyTeamLearningLevel || "",

      supportAnswer: surveyData.support.answer || "",
      supportReason: surveyData.support.reason || "",
      communicationAnswer: surveyData.communication.answer || "",
      communicationReason: surveyData.communication.reason || "",
      psychologicalSafetyAnswer: surveyData.psychologicalSafety.answer || "",
      psychologicalSafetyReason: surveyData.psychologicalSafety.reason || ""
    };

    db.collection("seafarer-survey").add({ ...cleanedData, createdAt: firebase.firestore.FieldValue.serverTimestamp(), source: "web" })
      .then(() => {
        console.log("✅ Survey data saved to Firestore!");
        renderThankYouPage();
      })
      .catch((error) => {
        console.error("❌ Error saving to Firestore:", error);
        alert("There was a problem submitting your survey. Please try again later.");
      });
  });
}
