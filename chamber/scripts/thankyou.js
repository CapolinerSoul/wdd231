const queryParams = new URLSearchParams(window.location.search);

const fname = queryParams.get('first_name') || '';
const lname = queryParams.get('last_name') || '';
const emailAddress = queryParams.get('email') || '--';
const mobilePhone = queryParams.get('mobile') || '--';
const orgName = queryParams.get('organization') || '--';
const rawTime = queryParams.get('timestamp');

document.getElementById('field-name').textContent = `${fname} ${lname}`.trim() || '--';
document.getElementById('field-email').textContent = emailAddress;
document.getElementById('field-mobile').textContent = mobilePhone;
document.getElementById('field-org').textContent = orgName;

if (rawTime) {
    try {
        document.getElementById('field-time').textContent = new Date(rawTime).toLocaleString();
    } catch (err) {
        document.getElementById('field-time').textContent = rawTime;
    }
}
