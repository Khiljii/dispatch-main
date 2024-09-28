'use client';
import { useState, useEffect } from 'react';
import AdditionalInformationForm from './AdditionalInformationForm'
import ImmediateResponseForm from './ImmediateResponseForm'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
// Immediate Response Form Component


// Additional Information Form Component


const BillingForm = (props) => {
    const [showImmediateForm, setShowImmediateForm] = useState(true);
    const date = new Date()
    const date2 = new Date(date.getTime() + 10 * 60 * 1000);const [user, setUser] = useState(null);

    useEffect(() => {
      const token = cookies.get("token");
      async function fetchData() {
        try {
          const response = await axios.post("/api/auth/user",{
            token2: token
          });
          setUser(response.data.decoded);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
      }
      fetchData(); 
    }, []);
  
    const [formData, setFormData] = useState({
        callerName: "",
        phoneNumber: "",
        age: "",
        address2: "",
        pin: "",
        emergencyType2: "",
        callerDescription: "",
        specialInstructions: "",
        firstName:"",
        pinDropNumber:"",
        address:"",
        responseTime:'05:00',
        emergencyType:"",
        dateTime: new Date(date).toDateString(),
        duration: "10:00",
        status: 'completed',
        dispatcherName: '', emergencyPersonnel: 'Jenny Wilson',
        completionTime: '20 minutes', callStartTime: date.toLocaleString(), // Human-readable format
        callEndTime: date2.toLocaleString()
      });

    const router = useRouter();

    const handleImmediateSubmit = (data) => {
        console.log('Immediate Data:', data);
        setShowImmediateForm(false);
    };

    const handleAdditionalSubmit = async () => {
    
    
        try {
          const response = await axios.post("/api/auth/caller", {
              ...formData
            });
            console.log("Login Success", response.data);
            toast.success("Call Success");
            props.handleHideFrom();
        } catch (error) {
         
          console.log(error.message);
    
          // toast.error("Password or Email incorrect");
          setError(true)
        }
      };

    return (
        <div>
            {showImmediateForm ? (
                <ImmediateResponseForm formData={formData} setFormData={setFormData} onSubmit={handleImmediateSubmit} />
            ) : (
                <AdditionalInformationForm
                    onSubmit={handleAdditionalSubmit}
                    setFormData={setFormData}
                    formData={formData}
                    onClose={() => setShowImmediateForm(true)}
                />
            )}
        </div>
    );
};

export default BillingForm;
