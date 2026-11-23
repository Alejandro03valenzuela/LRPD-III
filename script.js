/* ==========================================
   CONSENTIDO - JAVASCRIPT PRINCIPAL
========================================== */

// MENÚ RESPONSIVE
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// INFORMACIÓN DESPLEGABLE
function toggleInfo(id) {
    const element = document.getElementById('extra' + id);
    element.classList.toggle('show');
}

// ANIMACIONES AL DESPLAZARSE
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// BOTÓN VOLVER ARRIBA
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// PREGUNTAS FRECUENTES
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item.classList.toggle('active');
    });
});

// TEST INTERACTIVO
const questions = [
    {
        q: "¿Qué significa responsabilidad sexual?",
        a: [
            "Tomar decisiones informadas y respetuosas.",
            "Hacer lo que otras personas decidan.",
            "Evitar hablar sobre sexualidad."
        ],
        correct: 0,
        explanation: "La responsabilidad sexual implica decisiones libres, informadas y respetuosas."
    },
    {
        q: "¿Qué es el consentimiento?",
        a: [
            "Aceptar por presión.",
            "Una decisión libre y voluntaria.",
            "No expresar ninguna opinión."
        ],
        correct: 1,
        explanation: "El consentimiento debe ser libre, claro y puede retirarse en cualquier momento."
    },
    {
        q: "¿Qué ayuda a reducir el riesgo de ITS?",
        a: [
            "Ignorar los síntomas.",
            "Compartir información sin verificar.",
            "Usar correctamente el preservativo y realizarse pruebas."
        ],
        correct: 2,
        explanation: "La prevención incluye preservativos, pruebas y orientación sanitaria."
    },
    {
        q: "¿Qué debemos hacer ante una duda sobre anticoncepción?",
        a: [
            "Buscar información confiable y orientación profesional.",
            "Guiarnos únicamente por rumores.",
            "Evitar preguntar."
        ],
        correct: 0,
        explanation: "Un profesional sanitario puede orientar sobre las diferentes alternativas."
    },
    {
        q: "¿Qué debemos hacer si alguien establece un límite?",
        a: [
            "Ignorarlo.",
            "Respetarlo.",
            "Insistir hasta cambiar su opinión."
        ],
        correct: 1,
        explanation: "Respetar los límites personales es fundamental en cualquier relación."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const feedback = document.getElementById('feedback');
const progressBar = document.getElementById('progressBar');

function loadQuestion() {
    answered = false;
    const q = questions[currentQuestion];

    document.getElementById('questionNumber').textContent =
        `PREGUNTA ${currentQuestion + 1} DE ${questions.length}`;

    questionEl.textContent = q.q;
    answersEl.innerHTML = '';
    feedback.textContent = '';

    progressBar.style.width =
        (currentQuestion / questions.length * 100) + '%';

    q.a.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer';
        button.textContent = answer;

        button.addEventListener('click', () => {
            selectAnswer(index, button);
        });

        answersEl.appendChild(button);
    });

    nextBtn.disabled = true;
    nextBtn.style.opacity = '.5';
    nextBtn.textContent = 'Siguiente →';
}

function selectAnswer(index, button) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const allButtons = document.querySelectorAll('.answer');

    allButtons.forEach(b => b.disabled = true);

    if (index === q.correct) {
        score++;
        button.classList.add('correct');
        feedback.textContent = '¡Correcto! ✓ ' + q.explanation;
    } else {
        button.classList.add('wrong');
        allButtons[q.correct].classList.add('correct');
        feedback.textContent = 'Revisa la respuesta correcta. ' + q.explanation;
    }

    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? 'Ver resultado →'
            : 'Siguiente →';
}

nextBtn.addEventListener('click', () => {
    if (!answered) return;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById('quizContent').style.display = 'none';
    const result = document.getElementById('quizResult');
    result.style.display = 'block';

    document.getElementById('score').textContent =
        score + '/' + questions.length;

    let message = '';
    if (score === 5) {
        message = '¡Excelente! Tienes conocimientos muy sólidos sobre estos temas.';
    } else if (score >= 3) {
        message = '¡Buen trabajo! Sigue aprendiendo y reforzando tus conocimientos.';
    } else {
        message = '¡Este es el comienzo! Explora nuestras secciones educativas para aprender más.';
    }

    document.getElementById('resultText').textContent = message;
    progressBar.style.width = '100%';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    loadQuestion();
}

// FORMULARIO DEMOSTRATIVO
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('successMessage').style.display = 'block';
    this.reset();
});

/* ==========================================
   SENTIBOT - ASISTENTE EDUCATIVO
========================================== */

const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

chatToggle.addEventListener('click', () => {
    const isOpen = chatWindow.classList.toggle('open');
    chatToggle.setAttribute('aria-expanded', isOpen);
    chatWindow.setAttribute('aria-hidden', !isOpen);
    if (isOpen) chatInput.focus();
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('open');
    chatToggle.setAttribute('aria-expanded', 'false');
    chatWindow.setAttribute('aria-hidden', 'true');
});

const botKnowledge = [
{
keywords: ['responsabilidad sexual','que es responsabilidad','responsable sexual','sexualidad responsable'],
answer: `La responsabilidad sexual consiste en tomar decisiones conscientes, informadas y respetuosas sobre nuestra sexualidad.

Incluye:
• Respetar los límites personales.
• Prevenir ITS y embarazos no planificados.
• Comunicarse con honestidad.
• Buscar información confiable.
• Actuar sin presiones.

¡Decidir responsablemente también es cuidarse! 💜`
},
{
keywords: ['its','infecciones de transmision','enfermedades sexuales','infeccion sexual'],
answer: `Las ITS son infecciones que pueden transmitirse principalmente mediante contacto sexual.

Algunas son:
• VIH.
• Sífilis.
• Gonorrea.
• Clamidia.
• Virus del papiloma humano (VPH).

La prevención, las pruebas y la orientación sanitaria son fundamentales.`
},
{
keywords: ['anticonceptivos','metodos anticonceptivos','evitar embarazo','tipos de anticonceptivos'],
answer: `Existen diferentes métodos anticonceptivos:

• Preservativos.
• Pastillas anticonceptivas.
• Implantes.
• Inyecciones.
• Dispositivos intrauterinos (DIU).

Cada método tiene características y niveles de eficacia diferentes.

Un profesional de salud puede orientarte sobre las alternativas disponibles.`
},
{
keywords: ['preservativo','condon','usar condon','preservativos'],
answer: `El preservativo es un método de barrera que ayuda a prevenir embarazos y reduce el riesgo de muchas ITS.

Recomendaciones:
• Revisa su fecha de vencimiento.
• Comprueba que el envase esté intacto.
• Utiliza uno nuevo en cada relación sexual.
• Sigue las instrucciones del fabricante.
• Evita lubricantes aceitosos con preservativos de látex.

No ofrece protección absoluta frente a todas las ITS.`
},
{
keywords: ['consentimiento','que es consentimiento','aceptacion','decir no'],
answer: `El consentimiento es una decisión libre, voluntaria e informada.

Debe existir sin presión, amenazas ni manipulación.

Recuerda:
• Un sí debe ser libre.
• El silencio no significa consentimiento.
• Se puede cambiar de opinión.
• Los límites deben respetarse.

¡Respetar un NO también es demostrar responsabilidad! 💜`
},
{
keywords: ['embarazo adolescente','embarazo precoz','embarazo joven'],
answer: `El embarazo durante la adolescencia puede presentar desafíos relacionados con la salud, la educación y el bienestar emocional.

Es importante contar con educación sexual integral, información confiable, orientación profesional y acceso a servicios de salud.`
},
{
keywords: ['vih','sida','diferencia vih sida'],
answer: `El VIH es un virus que afecta el sistema inmunitario.

El SIDA es la etapa más avanzada de la infección por VIH cuando no se recibe tratamiento adecuado.

Actualmente existen tratamientos eficaces que permiten a las personas con VIH llevar una vida saludable.

El VIH no se transmite por abrazos, compartir alimentos o dar la mano.`
},
{
keywords: ['sintomas its','sintomas infecciones','como saber si tengo una its','signos its'],
answer: `Algunas ITS pueden causar secreciones inusuales, molestias al orinar, lesiones o dolor.

Sin embargo, muchas ITS no presentan síntomas.

La única manera de saberlo con seguridad es realizarse las pruebas correspondientes en un servicio de salud.`
},
{
keywords: ['prueba vih','prueba its','donde hacerme pruebas','analisis its'],
answer: `Puedes solicitar pruebas de VIH y otras ITS en establecimientos de salud.

En Perú puedes consultar los servicios disponibles en centros de salud del MINSA.

Recibir un diagnóstico temprano facilita el acceso al tratamiento adecuado.`
},
{
keywords: ['anticoncepcion de emergencia','pastilla emergencia','pastilla del dia siguiente'],
answer: `La anticoncepción de emergencia puede ayudar a prevenir un embarazo después de una relación sexual sin protección o un fallo anticonceptivo.

Debe utilizarse lo antes posible, porque su eficacia depende del método y del tiempo transcurrido.

Consulta cuanto antes con un profesional de salud o farmacia para conocer las opciones disponibles.

No interrumpe un embarazo ya establecido.`
},
{
keywords: ['abstinencia','no tener relaciones','esperar para relaciones'],
answer: `La abstinencia sexual es una decisión personal válida.

Esperar para iniciar una vida sexual es una elección que merece respeto y nunca debe generar burlas ni presiones.`
},
{
keywords: ['masturbacion','masturbarse','autoexploracion'],
answer: `La masturbación es una conducta relacionada con el conocimiento del propio cuerpo.

Es una decisión personal y privada.

No es necesario realizarla para tener una vida saludable y nadie debe sentirse obligado a hacerlo.`
},
{
keywords: ['mitos sexualidad','mitos sexuales','verdades sexualidad','falsos mitos'],
answer: `Existen muchos mitos sobre la sexualidad.

Algunos ejemplos:

• No todas las ITS presentan síntomas.
• El VIH no se transmite por abrazos.
• El preservativo reduce el riesgo de muchas ITS.
• El consentimiento es necesario en todas las relaciones.
• La anticoncepción de emergencia no interrumpe un embarazo establecido.

Busca siempre información de fuentes confiables.`
},
{
keywords: ['relacion saludable','relaciones sanas','noviazgo saludable','relacion respetuosa'],
answer: `Una relación saludable se construye mediante:

• Respeto mutuo.
• Comunicación.
• Confianza.
• Libertad personal.
• Consentimiento.
• Ausencia de violencia y control.

El cariño nunca debe convertirse en presión o manipulación.`
},
{
keywords: ['vacuna vph','virus papiloma','papiloma humano','vph'],
answer: `El VPH es un virus muy frecuente que puede transmitirse por contacto íntimo.

Algunos tipos pueden causar verrugas y otros pueden producir ciertos tipos de cáncer.

La vacunación contra el VPH ayuda a prevenir enfermedades relacionadas con este virus.

Consulta en un establecimiento de salud sobre el esquema de vacunación disponible.`
},
{
keywords: ['presion pareja','me obliga','obligacion sexual','mi pareja insiste'],
answer: `Nadie tiene derecho a obligarte a realizar algo que no deseas.

Una relación debe basarse en el respeto y la libertad de decisión.

Si experimentas presión o violencia, busca apoyo de una persona de confianza o de un servicio especializado.

Tus límites merecen ser respetados. 💜`
},
{
keywords: ['embarazo prueba','test embarazo','saber si estoy embarazada','prueba embarazo'],
answer: `Una prueba de embarazo puede ayudar a confirmar si existe un embarazo.

Las pruebas de orina suelen ser más fiables desde el primer día de retraso menstrual.

Si no sabes cuándo debería llegar tu periodo, puedes realizarla al menos 21 días después de la relación sexual sin protección.

Si tienes dudas sobre el resultado, consulta con un profesional de salud.`
},
{
keywords: ['menstruacion','regla','periodo menstrual','ciclo menstrual'],
answer: `La menstruación es un proceso natural del ciclo menstrual.

Su duración y características pueden variar entre personas y también de un ciclo a otro.

Si presentas dolor intenso, sangrado muy abundante o cambios que te preocupan, consulta con un profesional de salud.`
},
{
keywords: ['orientacion confidencial','confidencialidad','privacidad','consulta privada'],
answer: `La orientación en salud sexual debe brindarse con respeto y privacidad.

Las condiciones de confidencialidad y sus límites pueden depender de la edad, el servicio y las normas aplicables.

Puedes preguntar al personal sanitario cómo protegen tu información antes de compartir datos personales.`
},
{
keywords: ['promotores pares','hablemos claro','promotor par'],
answer: `Los Promotores Pares son personas que ayudan a compartir información y sensibilizar a su comunidad.

En ConSentido, la iniciativa "Hablemos claro" busca:
• Fomentar la educación.
• Promover la prevención.
• Compartir información confiable.
• Combatir mitos.
• Impulsar el diálogo respetuoso. 🤝`
},
{
keywords: ['orientacion sexual','homosexualidad','gay','lesbiana'],
answer: `La orientación sexual se relaciona con la atracción afectiva o romántica que una persona puede sentir.

Todas las personas merecen respeto, dignidad y un trato libre de discriminación.`
},
{
keywords: ['abuso sexual','violencia sexual','sin consentimiento','me tocaron sin permiso'],
answer: `Nadie tiene derecho a tocarte o realizar actos íntimos contigo sin tu consentimiento.

Si estás viviendo una situación de violencia, no es tu culpa.

Busca apoyo de una persona adulta de confianza y de profesionales especializados.

En Perú puedes acudir a un Centro Emergencia Mujer o llamar a la Línea 100 para orientación. Si estás en peligro inmediato, busca ayuda de emergencia.`
},
{
keywords: ['lubricante','lubricacion','lubricantes'],
answer: `Los lubricantes ayudan a disminuir la fricción.

Los lubricantes a base de agua o silicona suelen ser compatibles con preservativos de látex.

Evita aceites y productos grasos con preservativos de látex porque pueden dañarlos.

Si tienes irritación o molestias, consulta con un profesional de salud.`
},
{
keywords: ['ducha vaginal','lavado vaginal','limpiar vagina','higiene vaginal'],
answer: `La vagina tiene mecanismos naturales de limpieza.

Las duchas vaginales no son necesarias y pueden alterar su equilibrio natural.

Para la higiene externa, basta con lavar suavemente la vulva con agua.

Si hay molestias o secreciones inusuales, consulta con un profesional.`
},
{
keywords: ['derechos sexuales','derechos reproductivos','derechos sexuales reproductivos'],
answer: `Los derechos sexuales y reproductivos incluyen:

• Recibir información.
• Tomar decisiones libres.
• Acceder a servicios de salud.
• Vivir sin violencia ni discriminación.
• Que se respete la privacidad.
• Recibir atención digna.

Todas las personas merecen un trato respetuoso. 💜`
}
];

function normalizeBotText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[¿?¡!.,;:]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function findBotAnswer(question) {
    const normalized = normalizeBotText(question);
    let bestMatch = null;
    let bestScore = 0;

    botKnowledge.forEach(item => {
        let score = 0;
        item.keywords.forEach(keyword => {
            const key = normalizeBotText(keyword);
            if (normalized === key) {
                score += 10;
            } else if (normalized.includes(key)) {
                score += 7;
            } else if (key.includes(normalized) && normalized.length > 6) {
                score += 3;
            } else {
                const words = key.split(' ');
                words.forEach(word => {
                    if (word.length > 3 && normalized.split(' ').includes(word)) {
                        score += 1;
                    }
                });
            }
        });
        if (score > bestScore) {
            bestScore = score;
            bestMatch = item;
        }
    });

    if (bestMatch && bestScore >= 2) {
        return bestMatch.answer;
    }

    return `¡Gracias por tu pregunta! 💜

No he encontrado una respuesta específica en mi base de conocimientos.

Puedes intentar escribir tu duda con otras palabras.

También puedes consultar estos temas:

• Responsabilidad sexual.
• Métodos anticonceptivos.
• Prevención de ITS.
• Consentimiento.
• Relaciones saludables.
• Derechos sexuales y reproductivos.

Recuerda que soy un asistente educativo y no sustituyo la orientación de un profesional de salud.`;
}

function addBotMessage(text, type) {
    const message = document.createElement('div');
    message.className = type === 'user' ? 'user-message' : 'bot-message';
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendToBot(question) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    const submitButton = chatForm.querySelector('button');
    if (submitButton.disabled) return;

    submitButton.disabled = true;
    addBotMessage(cleanQuestion, 'user');
    chatInput.value = '';

    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.textContent = 'SentiBot está escribiendo...';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        typing.remove();
        const answer = findBotAnswer(cleanQuestion);
        addBotMessage(answer, 'bot');
        submitButton.disabled = false;
        chatInput.focus();
    }, 650);
}

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    sendToBot(chatInput.value);
});

document.querySelectorAll('#suggestions button').forEach(button => {
    button.addEventListener('click', () => {
        sendToBot(button.dataset.question);
    });
});

// INICIAR
loadQuestion();