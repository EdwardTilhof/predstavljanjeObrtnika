import { useEffect, useState } from "react";
import { COMPANY_NAME } from "../../../constants";
import Services from "./Services";

export default function ServicesMain() {

  const [services, setServices] = useState([]);

    useEffect(() => {
      loadServices();
    }, []);

    async function loadServices() {
      await Services.get().then((response) => {
        setServices(response.data);
      });
    }

  return (
    <div>
      <h1>Welcome to {COMPANY_NAME}</h1>
      <p>This is the list of our current services:</p>
      <ul>
        {services && services.map((service) => (
          <li key={service.id}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );

}
