export const QUERY = {
    SELECT: 'SELECT * FROM `User` WHERE `id` = ?;',
    CREATE: 'INSERT INTO `User` (`name`, `email`, `passhash`) VALUES (?, ?, ?);',
    UPDATE: 'UPDATE `User` SET name = ?, email = ?, `passhash` = ? WHERE `id` = ?;',
    DELETE: 'DELETE FROM `User` WHERE `id` = ?;'
};