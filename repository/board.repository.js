const pool = require("./db");

// exports.findAll = async () => {
//   const [result] = await pool.query(`SELECT * FROM board ORDER by idx desc;`);
//   return result;
// };

exports.findAll = async (sort) => {
  // console.log('sort: ',sort)
  //LEFT JOIN은 같은 값을 return!
  const [result] = await pool.query(`
  SELECT board.*, COUNT(comments.boardIdx) as comment_count, COUNT(likes.boardIdx) as like_count FROM board
  LEFT JOIN comments ON board.idx = comments.boardIdx
  LEFT JOIN likes ON board.idx = likes.boardIdx
  GROUP BY board.idx
  ORDER BY ${sort} DESC
`);
  return result;
};




const cache = new Map();

exports.findOne = async (idx) => {
  let hitCount = cache.get(idx);
  if (!hitCount || Date.now() - hitCount.timestamp > 60 * 60 * 1000) {
    await pool.query(`UPDATE board SET hit = hit + 1 WHERE idx = ${idx};`);
    hitCount = { count: 1, timestamp: Date.now() };
  } else {
    hitCount.count++;
    hitCount.timestamp = Date.now();
  }
  cache.set(idx, hitCount);

  const boardSql = `SELECT * FROM board WHERE idx = ${idx}`;
  const commentsSql = `SELECT * FROM comments WHERE boardIdx = ${idx}`;
  const likesSql = `SELECT * FROM likes WHERE boardIdx = ${idx}`;
  const [[boardResult]] = await pool.query(boardSql);
  const [commentsResult] = await pool.query(commentsSql);
  const [likesResult] = await pool.query(likesSql);
  return { ...boardResult, comments: commentsResult, likes: likesResult };
};

// exports.findOne = async (idx) => {
//   await pool.query(`UPDATE board SET hit = hit + 1 WHERE idx = ${idx};`);
//   const boardSql = `SELECT * FROM board WHERE idx = ${idx}`;
//   const commentsSql = `SELECT * FROM comments WHERE boardIdx = ${idx}`;
//   const [[boardResult]] = await pool.query(boardSql);
//   const [commentsResult] = await pool.query(commentsSql);
//   return { ...boardResult, comments: commentsResult };
// };


exports.nextOne = async (idx) => {
  const [[result]] = await pool.query(
    `SELECT * FROM board WHERE idx > ${idx} ORDER BY idx ASC LIMIT 1`
  );
  if (result) {
    const nextIdx = result.idx;
    return nextIdx;
  } else {
    return null;
  }
};

exports.lastOne = async (idx) => {
  const [[result]] = await pool.query(
    `SELECT * FROM board WHERE idx < ${idx} ORDER BY idx DESC LIMIT 1`
  );
  if (result) {
    const lastIdx = result.idx;
    return lastIdx;
  } else {
    return null;
  }
};


exports.submit = async (writeData) => {
  const { subject, content, writer } = writeData;
  const write = `INSERT INTO board(subject, content, writer) 
  values('${subject}', '${content}', '${writer}');`;
  return pool.query(write);
};


exports.addComment = async (commentData) => {
  const { boardIdx, commenter, comment } = commentData;
  const add = `INSERT INTO comments(boardIdx, commenter, comment) 
  values('${boardIdx}', '${commenter}', '${comment}');`;
  return pool.query(add);
};


exports.modifyItem = async (writeData) => {
  const { subject, content, writer, idx } = writeData;
  const write = `UPDATE board SET subject = '${subject}', content= '${content}', writer = '${writer}'
  WHERE idx = ${idx};`;
  return pool.query(write);
};

exports.deleteItem = async (idx) => {
  const sql = `DELETE FROM board where idx=${idx};`;
  await pool.query(sql);
};

exports.deleteComment = async (commentIdx) => {
  const sql = `DELETE FROM comments where idx=${commentIdx};`;
  await pool.query(sql);
};

// exports.addLike = async (likeBody) => {
//   const { likeit, index } = likeBody
//   const sql = `UPDATE board SET likeit = likeit + 1  WHERE idx = ${index};`;
//   await pool.query(sql);
// }


exports.addLike = async (likeInfo) => {
  const { user_id, boardIdx } = likeInfo
  const values = [user_id, boardIdx];
  const dropLike = `DELETE FROM likes WHERE user_id = ? AND boardIdx = ?`;
  await pool.query(dropLike, values);
  const addLike = `INSERT INTO likes(user_id, boardIdx) 
  values('${user_id}', '${boardIdx}');`;
  await pool.query(addLike);
}



// this.findOne(1).then(data=>console.log(data))
// 프로미스 객체에 then 메서드를 호출해서 그 결과값을 콘솔에 출력

// this.findOne(61).then(data=>console.log(data))
// this.lastOne(61).then((data) => console.log(data));
// this.nextOne(61).then((data) => console.log(data));


// CREATE TABLE likes (
//   like_id INT(11) AUTO_INCREMENT PRIMARY KEY,
//   user_id varchar(50) NOT NULL,
//   boardIdx INT(11) NOT NULL,
//   register_date DATETIME DEFAULT CURRENT_TIMESTAMP
// );


// SELECT board.*, COUNT(comments.boardIdx) as comment_count, COUNT(likes.boardIdx) as like_count FROM board
// LEFT JOIN comments ON board.idx = comments.boardIdx
// LEFT JOIN likes ON board.idx = likes.boardIdx
// GROUP BY board.idx
// ORDER BY board.idx DESC;