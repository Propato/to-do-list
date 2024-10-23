export const QUERY = {
    SELECT: 'SELECT * FROM `Task` WHERE `taskId` = ? AND `userId` = ?;',
    SELECT_ALL: 'SELECT * FROM `Task` WHERE `userId` = ? AND (`title` LIKE ? OR `description` LIKE ?) AND (`status` LIKE ?) ORDER BY `deadline` LIMIT ? OFFSET ?;',
    CREATE: 'INSERT INTO `Task` (`userId`, `title`, `description`, `deadline`, `status`) VALUES (?, ?, ?, ?, ?);',
    UPDATE: 'UPDATE `Task` SET `title` = ?, `description` = ?, `deadline` = ? WHERE `taskId` = ? AND `userId` = ?;',
    UPDATE_STATUS: 'UPDATE `Task` SET `status` = ? WHERE `taskId` = ? AND `userId` = ? AND (`deadline` IS NULL OR `deadline` >= NOW());',
    DELETE: 'DELETE FROM `Task` WHERE `taskId` = ? AND `userId` = ?;'
};