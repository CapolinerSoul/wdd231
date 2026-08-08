            window.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            let output = '';
            
            const keysMapping = {
                'username': 'Username / Alias',
                'email': 'Email Address',
                'company': 'Company Name',
                'commission_type': 'Commission Type',
                'additional_characters': 'Additional Characters',
                'complex_background': 'Complex Background',
                'nsfw': 'NSFW Request',
                'description': 'Solicitation Description'
            };

        Object.keys(keysMapping).forEach(key => {
                let value = urlParams.get(key);
                
                if (key === 'complex_background' || key === 'nsfw') {
                    value = value ? 'Yes' : 'No';
                } else if (!value || value.trim() === '') {
                    value = (key === 'company') ? 'N/A' : ((key === 'additional_characters') ? '0' : 'None');
                }

                const safeValue = decodeURIComponent(value).replace(/\+/g, ' ');
                output += `<div class="summary-item"><strong>${keysMapping[key]}:</strong> <span>${safeValue}</span></div>`;
            });

            document.getElementById('summary-content').innerHTML = output;
        });