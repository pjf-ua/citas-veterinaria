import { useState, useEffect } from "react"
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);
    //Para cuando le demos a editar que se llenen
    //los campos del form
    useEffect(() => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36)

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //Validacion
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            console.log('Hay al menos un campo vacío')
            setError(true)
            return;
        }
        setError(false)

        //Objeto de paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }
        
        if(paciente.id) {
            //Editando registro
            objetoPaciente.id = paciente.id
            const pacientesAct = pacientes.map(pacienteState => pacienteState.id ===
                paciente.id ? objetoPaciente : pacienteState)
                
            setPacientes(pacientesAct)
            setPaciente({})
        }
        else {
            //Nueov registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }
        //Hace una copia. USAR INMUTABILIDAD
        //NUNCA MODIFICAR SOBRE EL ARRAY ORIGINAL

        //Reiniciar formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade pacientes y {""}
                <span className="text-indigo-600 font-bold">Adminístralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5"
            >
                {error && <Error> <p> mensaje='Todos los campos son obligatorios'</p></Error>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre mascota
                    </label>
                    <input id="mascota" 
                            type="text" 
                            placeholder="Nombre de la Mascota"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="prop" className="block text-gray-700 uppercase font-bold">
                        Nombre propietario
                    </label>
                    <input id="prop" 
                            type="text" 
                            placeholder="Nombre de propietario"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            value={propietario}
                            onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input id="email" 
                            type="email" 
                            placeholder="Email contacto"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input id="alta" 
                            type="date" 
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea id="sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los síntomas"
                    value={sintomas}
                    onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                        value={ paciente.id ? 'Editar paciente' : 'Agregar paciente'}
                />
            </form>
        </div>
    )
}

export default Formulario