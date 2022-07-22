import { name, lorem } from 'faker';
import { writeFileSync } from 'fs';

interface Post {
	author: string,
	id: number,
	title: string,
	body: string
}

interface DB {
	posts: Post[]
}

const database: DB = { posts: [] };
const postCount = 1000;

for (let i = 1; i <= postCount; i += 1) {
	database.posts.push({
		id: i,
		title: lorem.text(10),
		body: lorem.paragraph(),
		author: `${name.firstName()} ${name.lastName()}`,
	});
}

writeFileSync(`${__dirname}/db.json`, JSON.stringify(database));
