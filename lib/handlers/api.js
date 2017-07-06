import studentService from '../../stores/students';


const internals = {};


const getAll = {
    description: 'returns all students',
    handler: (request, reply) => {

        return reply(studentService);
    }
};

const getOne = {
    description: 'returns one student',
    handler: (request, reply) => {

        return reply(studentService[request.params.id]);
    }
};


export default { getAll, getOne };
