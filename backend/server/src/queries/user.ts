export const QUERY = {
    SELECT_ALL: 'SELECT * FROM `User`;',
    SELECT_NAME: 'SELECT `name` FROM `User` WHERE `id` = ?;',
    SELECT_BY_EMAIL: 'SELECT * FROM `User` WHERE `email` = ?;',
    CREATE: 'INSERT INTO `User` (`name`, `email`, `passhash`) VALUES (?, ?, ?);',
    UPDATE: 'UPDATE `User` SET name = ?, email = ?, `passhash` = ? WHERE `id` = ?;',
    DELETE: 'DELETE FROM `User` WHERE `id` = ?;'
};