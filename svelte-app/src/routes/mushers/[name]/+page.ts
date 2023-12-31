export const load = ({ params }) => {
	console.log(params.name);
	return {
		name: params.name
	};
};
