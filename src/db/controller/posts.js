import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Post = {

    async create(req, res) {
        const text = `INSERT INTO
      posts(id_post, id_user, text, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
        const values = [
            uuidv4(),
            req.body.id_user,
            req.body.text,
            moment(new Date()),
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },

    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM posts';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({ rows, rowCount });
        } catch(error) {
            return res.status(400).send(error);
        }
    },

    async getOne(req, res) {
        const text = 'SELECT * FROM posts WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'post not found'});
            }
            return res.status(200).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error)
        }
    },

    async update(req, res) {
        const findOneQuery = 'SELECT * FROM posts WHERE id=$1';
        const updateOneQuery =`UPDATE posts
      SET text=$1,modified_date=$2
      WHERE id_post=$3 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'post not found'});
            }
            const values = [
                req.body.text || rows[0].text,
                moment(new Date()),
                req.params.id_post
            ];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).send(response.rows[0]);
        } catch(err) {
            return res.status(400).send(err);
        }
    },

    async delete(req, res) {
        const deleteQuery = 'DELETE FROM posts WHERE id_post=$1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'post not found'});
            }
            return res.status(204).send({ 'message': 'deleted' });
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default Post;