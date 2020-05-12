const userList = `
SELECT nuser_id, 
CONCAT(nuser_firstname, ' ',nuser_lastname) as nfull_name,
nuser_group, 
nuser_name, 
nuser_email, 
nuser_phone1, 
nuser_phone2, 
nuser_password, 
nuser_activated, 
nuser_activation_key, 
nuser_firstname,
nuser_suffixname,
nuser_lastname,
nuser_middlename,
tuser_birthdate,
suser_birthplace,
saddress_line_1,
saddress_line_2,
scity,
sstate,
suser_country,
nnationality_id,
nuser_verified,
nuser_gender, 
nuser_picture, 
sfather_lastname, 
sfather_middleame, 
sfather_firstname, 
sfather_email, 
sfather_occupation, 
nisfather_guardian,
smother_lastname, 
smother_middleame,
smother_firstname,
smother_occupation,
smother_email,
nismother_guardian,
sguardian_lastname,
sguardian_middlename,
sguardian_firstname,
scontact_emergency,
slast_school_attended,
ndefault_pageview,
ndefault_clientview,
nforce_change_password,
nis_active,
scode_access,
intime,
uptime,
status,
CASE WHEN users.uptime is null THEN users.intime WHEN users.uptime > users.intime
THEN users.uptime ELSE users.intime END AS OrderDateTime 
FROM users
`;
const userListCount = `
SELECT COUNT(nuser_id) AS id, 
CONCAT(nuser_firstname, ' ',nuser_lastname) as nfull_name,
CASE WHEN users.uptime is null THEN users.intime WHEN users.uptime > users.intime
THEN users.uptime ELSE users.intime END AS OrderDateTime FROM users
`;


module.exports = {
  userList,
  userListCount,
};
