// Create a new script called 'OpenOverlayButton'
var OpenOverlayButton = pc.createScript('openOverlayButton');

// Initialize the script
OpenOverlayButton.prototype.initialize = function() {
    // Create a button in PlayCanvas
    var button = document.createElement('button');
    button.innerHTML = 'Assessment';
    button.style.position = 'absolute';
    button.style.cursor = 'pointer';

    // Add custom styles for the button
    button.style.backgroundColor = '#36c29f'; // Green background
    button.style.border = 'none'; // Remove border
    button.style.color = 'white'; // White text
    button.style.padding = '15px 32px'; // Padding
    button.style.textAlign = 'center'; // Center text
    button.style.textDecoration = 'none'; // Remove underline
    button.style.display = 'inline-block'; // Display inline-block
    button.style.fontSize = '16px'; // Font size
    button.style.margin = '4px 2px'; // Margin
    button.style.transitionDuration = '0.4s'; // Transition effect
    button.style.borderRadius = '12px'; // Rounded corners
    button.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)'; // Box shadow

    // Add hover effect
    button.onmouseover = function() {
        button.style.backgroundColor = '#36c29f'; // Darker green
    };

    button.onmouseout = function() {
        button.style.backgroundColor = '#36c29f'; // Original green
    };

    document.body.appendChild(button);

    // Function to update the button position and size
    var updateButtonPositionAndSize = function() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        if (windowWidth < 800) {
            button.style.top = '10px';
            button.style.left = (windowWidth / 2 - button.offsetWidth / 2) + 'px';
            button.style.padding = '10px 20px';
            button.style.fontSize = '12px';
        } else {
            button.style.top = '1px';
            button.style.left = '1000px';
            button.style.padding = '15px 32px';
            button.style.fontSize = '16px';
        }
    };

    // Initial call to set the button position and size
    updateButtonPositionAndSize();

    // Add event listener to update button position and size on window resize
    window.addEventListener('resize', updateButtonPositionAndSize);

    // Add event listener to the button to open the overlay
    button.addEventListener('click', function() {
        // Calculate the overlay window size based on the current window size
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        var overlayWidth = Math.min(800, windowWidth * 0.8);
        var overlayHeight = Math.min(600, windowHeight * 0.8);

        // Calculate the left and top positions to center the overlay
        var left = Math.max(0, (windowWidth - overlayWidth) / 2);
        var top = Math.max(0, (windowHeight - overlayHeight) / 2);

        // Open the overlay with calculated size and position
        var overlayWindow = window.open(
            'https://forms.office.com/pages/responsepage.aspx?id=XE-KYyKHXU6Q3hWTp2wMRjYDe7FlYFlEvv-zbkOOqUlUMDgxQTNWQTlNSVVVVzVXVlZTUldXUDlVSy4u', 
            'Overlay', 
            `width=${overlayWidth},height=${overlayHeight},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no`
        ); 

        
    });
};

// Optional: Add a script to handle the update cycle if necessary
OpenOverlayButton.prototype.update = function(dt) {
    // You can add logic here if needed
};
