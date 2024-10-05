import { getCookie } from "./cookieUtils.js";

document.addEventListener('DOMContentLoaded', function () {
    const timelineSection = document.querySelector('.timeline-section');

    function attachTextareaListener(input, textarea, line, isMobile, savedLineHeight) {
        if (!line) {
            console.error("Don't worry! Line element not found.");
            return;
        }

        const initialLineHeight = 130;
        let currentLineHeight = savedLineHeight ? parseInt(savedLineHeight, 10) : initialLineHeight; 
        line.style.height = currentLineHeight + "px"; 
        let minLineHeight = initialLineHeight;
            
        textarea.addEventListener("input", function () {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";

            const extraHeight = 50; 
            const newLineHeight = textarea.scrollHeight + extraHeight; 
            const currentLineHeightFromStyle = parseInt(window.getComputedStyle(line).height, 10); 

            
            if (currentLineHeightFromStyle < newLineHeight) {
                currentLineHeight = newLineHeight;
                line.style.height = currentLineHeight + "px";
                console.log("Line height increased to:", currentLineHeight);
            } 
            
            else if (currentLineHeightFromStyle > newLineHeight && currentLineHeight > minLineHeight) {
                currentLineHeight = Math.max(minLineHeight, newLineHeight); 
                line.style.height = currentLineHeight + "px";
                console.log("Line height decreased to:", currentLineHeight);
            }
        });

        input.addEventListener("input", function () {
            const inputLineHeight = parseInt(window.getComputedStyle(input).lineHeight, 10);
            const inputScrollHeight = input.scrollHeight;

            if (inputScrollHeight > inputLineHeight && minLineHeight === initialLineHeight) {
                minLineHeight += 20; 
                currentLineHeight = minLineHeight;
            }
            else if (inputScrollHeight <= inputLineHeight && minLineHeight > initialLineHeight) {
                minLineHeight = initialLineHeight;
                currentLineHeight = minLineHeight;
            }
            
            line.style.height = currentLineHeight + "px";
        });
    }

    // Apply listeners to all existing timeline groups
    document.querySelectorAll('.timeline-group').forEach(function (group, index) {
        const input = group.querySelector('.enter-name-text');
        const textarea = group.querySelector('.enter-description-text');
        const line = group.querySelector('.line');
        const savedLineHeight = getCookie(`timelineLineHeight_${index}`);
        attachTextareaListener(input, textarea, line, false, savedLineHeight);
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
            textarea.style.height = '110px';
            newGroup.style.marginTop = '-20px'; // !! 15, 17
            
            // Show the add icon only for the new group
            newGroup.querySelector('.add-icon').style.display = 'block';

            // Add the new group to the section
            timelineSection.appendChild(newGroup);

            // Apply listeners to the new textarea and line
            var line = newGroup.querySelector('.line');
            attachTextareaListener(input, textarea, line, isMobile, null);
        }
    });
});
