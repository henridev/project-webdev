import { MemeDB } from '../../src/api/components/meme/model'
import { ADMIN } from './users'

export const memes: MemeDB[] = [
	{
		id: '2db6de50-0135-457f-9666-2259746d7b07',
		name: 'meme-1',
		img_url: 'https://res.cloudinary.com/dri8yyakb/image/upload/v1640073730/tmynvxqlxkncnviunrnj.jpg',
		creator_id: ADMIN.id,
		categories: JSON.stringify(['cool']) as any
	},
	{
		id: '3db6de50-0135-457f-9666-2259746d7b07',
		name: 'meme-2',
		img_url: 'https://res.cloudinary.com/dri8yyakb/image/upload/v1640081350/Sad-Pablo-Escobar_raobi1.jpg',
		creator_id: ADMIN.id,
		categories: JSON.stringify(['cool']) as any
	},
	{
		id: '4db6de50-0135-457f-9666-2259746d7b07',
		name: 'meme-3',
		img_url: 'https://res.cloudinary.com/dri8yyakb/image/upload/v1640081350/Monkey-Puppet_x2fvyl.jpg',
		creator_id: ADMIN.id,
		categories: JSON.stringify(['cool']) as any
	},
	{
		id: '5db6de50-0135-457f-9666-2259746d7b07',
		name: 'meme-4',
		img_url: 'https://res.cloudinary.com/dri8yyakb/image/upload/v1640081350/X-X-Everywhere_hgub2k.jpg',
		creator_id: ADMIN.id,
		categories: JSON.stringify(['cool']) as any
	},
	{
		id: '6db6de50-0135-457f-9666-2259746d7b07',
		name: 'meme-5',
		img_url: 'https://res.cloudinary.com/dri8yyakb/image/upload/v1640081646/One-Does-Not-Simply_hmc6cr.jpg',
		creator_id: ADMIN.id,
		categories: JSON.stringify(['cool']) as any
	},
	{
		id: '7db6de50-0135-457f-9666-2259746d7b07',
		name: 'meme-6',
		img_url: 'https://res.cloudinary.com/dri8yyakb/image/upload/v1640081350/Buff-Doge-vs-Cheems_reiadp.png',
		creator_id: ADMIN.id,
		categories: JSON.stringify(['cool']) as any
	},
	{
		id: '8db6de50-0135-457f-9666-2259746d7b07',
		name: 'meme-7',
		img_url: 'https://res.cloudinary.com/dri8yyakb/image/upload/v1640081350/Change-My-Mind_aqe148.jpg',
		creator_id: ADMIN.id,
		categories: JSON.stringify(['cool']) as any
	},
	{
		id: '9db6de50-0135-457f-9666-2259746d7b07',
		name: 'meme-8',
		img_url: 'https://res.cloudinary.com/dri8yyakb/image/upload/v1640081351/5c7lwq_kqpun8.png',
		creator_id: ADMIN.id,
		categories: JSON.stringify(['cool']) as any
	}
]