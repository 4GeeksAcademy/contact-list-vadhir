const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST", 
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			initializeAgenda: async () => {
				try {
					console.log("Iniciando la verificación de la agenda...");
			
					const response = await fetch("https://playground.4geeks.com/contact/agendas/Vadhir");
					if (response.status === 404) {
						console.log("Agenda 'Vadhir' no encontrada. Creando agenda...");
						await fetch("https://playground.4geeks.com/contact/agendas/Vadhir", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ name: "Vadhir" })
						});
						console.log("Agenda 'Vadhir' creada.");
					} else {
						console.log("Agenda 'Vadhir' ya existe.");
					}
			
					console.log("Cargando los contactos...");
					await getActions().loadContacts();

			
					} catch (error) {
					console.error("Error al verificar o crear la agenda:", error);
					}
				},			
			
					  

			  clearContacts: async () => {
				try {
				  const store = getStore();
				  const contacts = store.contacts;

				  for (let contact of contacts) {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/Vadhir/contacts/${contact.id}`, {
					  method: "DELETE",
					});
			  
					if (response.ok) {
					  console.log(`Contacto con id ${contact.id} eliminado.`);
					} else {
					  console.error(`Error al eliminar el contacto con id ${contact.id}:`, response.status);
					}
				  }
			  
				  setStore({ contacts: [] });
			  
				} catch (error) {
				  console.error("Error al eliminar todos los contactos:", error);
				}
			  },
			  

			  loadContacts: async () => {
				try {
					console.log("Cargando los contactos desde la API...");
					const response = await fetch("https://playground.4geeks.com/contact/agendas/Vadhir/contacts");
					
					if (response.ok) {
						const data = await response.json();
						console.log("Datos recibidos de la API:", data); 
			
						if (Array.isArray(data.contacts)) {
							setStore({ contacts: data.contacts });
							console.log("Los contactos han sido actualizados en el estado.");
						} else {
							console.error("La propiedad 'contacts' no es un array válido", data.contacts);
							setStore({ contacts: [] });
						}
					} else {
						console.error("Error al obtener los contactos, estado:", response.status);
					}
				} catch (error) {
					console.error("Error al cargar los contactos:", error);
				}
			},
			

			addContact: async (contact) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/Vadhir/contacts", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(contact)
					});

					if (response.ok) {
						getActions().loadContacts();
					} else {
						console.error("Error al agregar contacto:", await response.json());
					}
				} catch (error) {
					console.error("Error en la petición de agregar contacto:", error);
				}
			},

			deleteContact: async (contactId) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/Vadhir/contacts/${contactId}`, {
						method: "DELETE"
					});
					if (response.ok) {
						console.log("Contacto eliminado");
						getActions().loadContacts();
					} else {
						console.error("Error al eliminar el contacto:", response.status);
					}
				} catch (error) {
					console.error("Error en la petición de eliminar contacto:", error);
				}
			},

			updateContact: async (contact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/Vadhir/contacts/${contact.id}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(contact)
					});
					if (response.ok) {
						console.log("Contacto actualizado");
						getActions().loadContacts();
					} else {
						console.error("Error al actualizar contacto:", response.status);
					}
				} catch (error) {
					console.error("Error en la petición de actualizar contacto:", error);
				}
			},
		}
	};
};

export default getState;

