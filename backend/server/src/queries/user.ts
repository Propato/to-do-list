export const QUERY = {
    SELECT_ALL: 'SELECT * FROM `User`;',
    SELECT: 'SELECT * FROM `User` WHERE `id` = ?;',
    SELECT_BY_EMAIL: 'SELECT * FROM `User` WHERE `email` = ?;',
    CREATE: 'INSERT INTO `User` (`name`, `email`, `password`) VALUES (?, ?, ?);',
    UPDATE: 'UPDATE `User` SET `name` = ?, `email` = ?, `password` = ? WHERE `id` = ?;',
    DELETE: 'DELETE FROM `User` WHERE `id` = ?;'
};