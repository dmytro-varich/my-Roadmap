import { getCookie } from "./cookieUtils.js";

document.addEventListener('DOMContentLoaded', function () {
    const savedTitle = getCookie("timelineTitle_0");

    // Checking the availability of data in cuckoo
    if (savedTitle) {
        const createButton = document.getElementById("CreateButton");
        const timelineSection = document.querySelector('.timeline-section');

        createButton.style.background = "#ea004e";
        createButton.textContent = "Done";
        
        const firstTimelineGroup = document.querySelector('.timeline-group');
        if (firstTimelineGroup) {
            firstTimelineGroup.remove();
        }
        
        const groupCount = getCookie('timelineGroupCount');
        for (let i = 0; i < groupCount; i++) {
            const title = getCookie(`timelineTitle_${i}`);
            const description = localStorage.getItem(`timelineDescription_${i}`);
            const lineHeight = parseInt(getCookie(`timelineLineHeight_${i}`), 10);
            const descriptionHeight = getCookie(`timelineHeightDescription_${i}`);
            const newGroup = createTimelineGroup(title, description, lineHeight, descriptionHeight);
            
            if (i > 0) {
                newGroup.style.marginTop = '-20px';
            }

            timelineSection.appendChild(newGroup);
        }

        function createTimelineGroup(title, description, lineHeight, descriptionHeight) {
            const group = document.createElement('div');
            group.className = 'timeline-group';

            const historyPoint = document.createElement('div');
            historyPoint.className = 'history-point';

            const point = document.createElement('div');
            point.className = 'circle';
            point.style.display = 'block';

            const line = document.createElement('div');
            line.className = 'line';
            line.style.display = 'block';

            historyPoint.appendChild(point);
            historyPoint.appendChild(line);

            const inputSection = document.createElement('div');
            inputSection.className = 'input-section';

            const input = document.createElement('textarea');
            input.className = 'enter-name-text';
            input.value = title || ''; 
            input.style.display = 'block';
            input.placeholder = 'Title...'; 
            input.rows = '1';
            input.cols = '30';

            const textarea = document.createElement('textarea');
            textarea.className = 'enter-description-text';
            textarea.value = description || '';
            textarea.style.display = 'block';
            
            textarea.style.height = descriptionHeight;
            textarea.rows = '3';
            textarea.cols = '40';

            input.setAttribute('readonly', true);
            textarea.setAttribute('readonly', true);
        
            inputSection.appendChild(input);
            inputSection.appendChild(textarea);

            group.appendChild(historyPoint);
            group.appendChild(inputSection);

            return group;
        }

        const groups = timelineSection.querySelectorAll('.timeline-group');
        if (groups.length > 0) {
            const lastGroup = groups[groups.length - 1];
            const lastLine = lastGroup.querySelector('.line');
            const lasthistoryPoint = lastGroup.querySelector('.history-point');
            
            if (lastLine && lasthistoryPoint) {
                lastLine.style.visibility = 'hidden';
                // lasthistoryPoint.style.cssText = "margin: 0 20px;";

                // Create an SVG element
                const add_icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                add_icon.setAttribute('class', 'add-icon');
                add_icon.setAttribute('width', '32px');
                add_icon.setAttribute('height', '32px');
                add_icon.setAttribute('viewBox', '0 0 24 24');
                add_icon.setAttribute('fill', 'none');
                add_icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                add_icon.style.display = 'block';  // Задаем стиль для SVG
                add_icon.style.visibility = 'hidden';  // Задаем стиль для SVG

                // Create the first <g> element
                const bgCarrier = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                bgCarrier.id = 'SVGRepo_bgCarrier';
                bgCarrier.setAttribute('stroke-width', '0');

                // Create the second <g> element
                const tracerCarrier = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                tracerCarrier.id = 'SVGRepo_tracerCarrier';
                tracerCarrier.setAttribute('stroke-linecap', 'round');
                tracerCarrier.setAttribute('stroke-linejoin', 'round');

                // Create the third <g> element that will be an icon
                const iconCarrier = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                iconCarrier.id = 'SVGRepo_iconCarrier';

                // Inside <g> add another <g> for the icon itself
                const innerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                innerGroup.id = 'Edit / Add_Plus_Circle';

                // Create an element <path> for icons
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.id = 'Vector';
                path.setAttribute('d', 'M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z');
                path.setAttribute('stroke', '#000000');
                path.setAttribute('stroke-width', '2');
                path.setAttribute('stroke-linecap', 'round');
                path.setAttribute('stroke-linejoin', 'round');

                // Insert <path> inside the inner <g>
                innerGroup.appendChild(path);

                // Insert everything <g> inside the icon
                iconCarrier.appendChild(innerGroup);

                // Add all created <g> to the main SVG element
                add_icon.appendChild(bgCarrier);
                add_icon.appendChild(tracerCarrier);
                add_icon.appendChild(iconCarrier);

                // Now add Add_icon to the right place on the page
                const historyPoint = lastGroup.querySelector('.history-point');
                historyPoint.appendChild(add_icon);
            }
        }


        const saveButton = document.querySelector('.button-save');
        saveButton.style.display = 'block';
        saveButton.style.background = '#eac300';
        saveButton.textContent = 'Edit';
    }

    const createButton = document.getElementById("CreateButton");
    // Add event listener to the create button
    createButton.addEventListener("click", function () {
        if (createButton.textContent === "Done") {
            return;
        }

        var circle = document.getElementById("circle");
        var enter = document.getElementById("enter-name-text");
        var description = document.getElementById("enter-description-text");
        var line = document.getElementById("line");
        var save_btn = document.getElementById("SaveButton");
        var add_icon = document.getElementById("add_icon");

        // Make all necessary elements visible
        circle.style.display = "block";
        enter.style.display = "block";
        description.style.display = "block";
        createButton.style.background = "#ea004e";
        createButton.textContent = "Done";
        line.style.display = "block";
        save_btn.style.display = "block";
        add_icon.style.display = "block";
    });
});


// Repair this
function highlightInput(event) {
    event.target.classList.add('highlight');
}

// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        highlightInput(event);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Function to update textarea height
    const adjustHeight = (textarea) => {
        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
        const maxHeight = lineHeight * 2; // Maximum for two lines

        // Reset height before recalculating
        textarea.style.height = 'auto';

        // Limit height to two lines
        textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
        // console.log(textarea.scrollHeight);

        // If the height exceeds two lines, trim the text
        if (textarea.scrollHeight > maxHeight + 4) {
            textarea.style.height = `${maxHeight}px`;
            const maxTextLength = textarea.value.length - 1;
            textarea.value = textarea.value.slice(0, maxTextLength); // Trim the text
        }
    };

    // Delegate events from the container holding textareas
    document.addEventListener('input', (event) => {
        if (event.target.matches('.enter-name-text')) {
            adjustHeight(event.target);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.target.matches('.enter-name-text')) {
            const textarea = event.target;

            // Prevent new line input if already two lines
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        }
    });

    // Function to update new textareas after they are added
    const updateTextareas = () => {
        const textareas = document.querySelectorAll('.enter-name-text');
        textareas.forEach(textarea => adjustHeight(textarea));
    };

    // If there's some function adding new .enter-name-text elements
    document.querySelector('.timeline-section').addEventListener('click', function (e) {
        if (e.target.closest('.add-icon')) {
            // Code to add new textarea...
            // Don't forget to call updateTextareas() after adding new elements!
            updateTextareas();
        }
    });
});
