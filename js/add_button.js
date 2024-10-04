import { getCookie } from "./cookieUtils.js";

document.addEventListener('DOMContentLoaded', function () {
    const timelineSection = document.querySelector('.timeline-section');

    // Function to extend the line based on textarea content
    function attachTextareaListener(textarea, line, isMobile, savedLineHeight) {
        if (!line) {
            console.error("Don't worry! Line element not found.");
            return;
        }

        const initialLineHeight = isMobile ? 130 : 110;
        if (savedLineHeight)
        {
            line.style.height = savedLineHeight + "px";
        } else {
            line.style.height = initialLineHeight + "px";
        }
        // line.style.display = 'block';
        // console.log(initialLineHeight);
        // line.style.height = initialLineHeight + "px";
        // const initialLineHeight = line.clientHeight; // Save initial line height

        textarea.addEventListener("input", function () {
            // Automatically adjust textarea height based on content
            textarea.style.height = "auto";
            textarea.style.height = (textarea.scrollHeight) + "px";

            const percent = isMobile ? 0.8 : 0.7;
            const distance = isMobile ? 30 : 50;

            // Extend the line only if the text height exceeds 80% of the initial line height
            if (textarea.scrollHeight > initialLineHeight * percent) {
                // Extend the line by an amount that exceeds 80% of the initial height
                line.style.height = textarea.scrollHeight + distance + "px"; // Add 10px for margin
                // animateHeight(line, parseFloat(line.style.height), textarea.scrollHeight + distance, 300); // 300ms for animation
            }
        });
    }

    // Apply listeners to all existing timeline groups
    document.querySelectorAll('.timeline-group').forEach(function(group, index) {
        const textarea = group.querySelector('.enter-description-text');
        const line = group.querySelector('.line');
        const savedLineHeight = getCookie(`timelineLineHeight_${index}`);
        attachTextareaListener(textarea, line, false, savedLineHeight);
    });

    timelineSection.addEventListener('click', function(e) {
        if (e.target.closest('.add-icon')) {
            const timelineGroups = document.querySelectorAll('.timeline-group');
            const lastTimelineGroup = timelineGroups[timelineGroups.length - 1];
            const newGroup = lastTimelineGroup.cloneNode(true);
            const isMobile = window.matchMedia("(max-width: 768px)").matches;

            // Hide the "Add" icon in all previous timeline groups
            timelineGroups.forEach(group => {
                const addIcon = group.querySelector('.add-icon');

                if (addIcon) {
                    addIcon.style.display = 'none';
                    // addIcon.style.visibility = 'hidden';
                    // addIcon.style.opacity = '0';
                }
            });

            const input = newGroup.querySelector('.enter-name-text');
            const textarea = newGroup.querySelector('.enter-description-text');

            // Reset new input field values
            input.value = "";
            input.style.border = "2px solid transparent";
            input.style.backgroundColor = "";
            input.style.borderRadius = "";

            textarea.placeholder = "Describe this waypoint...";
            textarea.value = "";
            textarea.style.height = isMobile ? '130px' : '110px';
            newGroup.style.marginTop = isMobile ? '-30px' : "-17px"; // !! 15, 17
            console.log(isMobile);
            // Show the add icon only for the new group
            newGroup.querySelector('.add-icon').style.display = 'block';

            // Add the new group to the section
            timelineSection.appendChild(newGroup);

            // Apply listeners to the new textarea and line
            var line = newGroup.querySelector('.line');
            attachTextareaListener(textarea, line, isMobile, null);
        }
    });
});
