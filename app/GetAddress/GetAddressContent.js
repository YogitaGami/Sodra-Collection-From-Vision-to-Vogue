"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import DisplayPriceDetails from "@/components/DisplayPriceDetails";
import PageLoader from "@/components/PageLoader";

const GetAddressContent = () => {
  const { data: session, update } = useSession();
  const pathname = usePathname(); //Correct way to get the current URL in App Router
  const router = useRouter();
  const [prevPath, setPrevPath] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobileNo: "",
      pinCode: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      addressType: "",
    },
  });

  const fetchAndSetAddress = async () => {
    try {
      const email = session?.user?.email;
      if (!email) return;

      const res = await fetch(`/api/address?email=${email}`);
      if (res.ok) {
        const data = await res.json();
        reset(data); // Pre-fill the form with address data
      }
    } catch (error) {
      console.error("Failed to fetch address:", error);
    }
  }; 

   useEffect(() => {
    if (typeof window === "undefined") return;

    console.log("Current Path:", pathname);

    if (!session) {
      localStorage.setItem("prevPage", pathname);
      setPrevPath(pathname);
      router.push("/Login");
    }
  }, [session, pathname, router]);

  useEffect(() => {
    if (session) {
      fetchAndSetAddress(); // separate effect for this
    }
  }, [session]);

  useEffect(() => {
    // simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  const onSubmit = async (data) => {
    if (!data.pinCode || !data.addressLine1 || !data.addressLine2) {
      setError("address", {
        type: "manual",
        message: "*Please update flat/house no and society/apartment details",
      });
    } else {
      try {
        const email = session?.user?.email || "";
        const payload = {
          ...data,
          email,
        };
        const response = await fetch("/api/address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Invalid JSON response" }));
          console.error("Failed to save data:", errorData);
          return;
        }

        const result = await response.json();
        console.log("Data saved successfully:", result);

        reset(); // Reset form on success
        router.push("/GetPayment");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

 
  return (
    <div className="getAddress py-28 mx-auto flex justify-center gap-12">
      <div className="contactDetails w-[35%] mx-20">
        <form
          className="flex flex-col border-[0.5px] border-[#54b7fa] p-5"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="py-2 font-semibold uppercase">Contact Details</h3>
          <input
            className="border-[1px] border-[#54b7fa] focus:ring-1 focus:ring-[#0680d0] focus-visible:bg-[#71c1f6] outline-none rounded-md mt-2 px-3 py-2 placeholder:text-[#54b7fa] placeholder:text-sm"
            placeholder="Name*"
            {...register("name", {
              required: { value: true, message: "*Feild is required" },
              minLength: { value: 2, message: "*Min length 2" },
              maxLength: { value: 20, message: "*Max length 20" },
            })}
          />
          {errors.name && (
            <span className="text-sm text-[#0680d0]">
              {errors.name.message}
            </span>
          )}
          <input
            className="border-[1px] border-[#54b7fa] focus:ring-1 focus:ring-[#0680d0] focus-visible:bg-[#71c1f6] outline-none rounded-md mt-2 px-3 py-2 placeholder:text-[#54b7fa] placeholder:text-sm"
            placeholder="Mobile No*"
            {...register("mobileNo", {
              required: { value: true, message: "*Feild is required" },
              minLength: { value: 10, message: "*Min length 10" },
              maxLength: { value: 10, message: "*Max length 10" },
            })}
          />
          {errors.mobileNo && (
            <span className="text-sm text-[#0680d0]">
              {errors.mobileNo.message}
            </span>
          )}
          <h3 className="pb-2 pt-6 font-semibold uppercase">Address</h3>
          <select
            {...register("pinCode", {
              required: "*Please select a pinCode",
            })}
            className="mt-2 px-3 py-2 rounded-md text-[#54b7fa] border-[1px] border-[#54b7fa] focus:outline-none focus:ring-1 focus:ring-[#0680d0]"
          >
            <option value="" disabled>
              Pin-Code*
            </option>
            <option value="456001">456001</option>
            <option value="456005">456005</option>
            <option value="456006">456006</option>
            <option value="456010">456010</option>
            <option value="456664">456664</option>
          </select>
          <input
            className="border-[1px] border-[#54b7fa] focus:ring-1 focus:ring-[#0680d0] focus-visible:bg-[#71c1f6] outline-none rounded-md mt-2 px-3 py-2 placeholder:text-[#54b7fa] placeholder:text-sm"
            placeholder="Address(House No/Building/Street/Area)*"
            {...register("addressLine1", {
              required: false,
            })}
          />
          {errors.address && (
            <span className="text-sm text-[#0680d0]">
              {errors.address.message}
            </span>
          )}
          <input
            className="border-[1px] border-[#54b7fa] focus:ring-1 focus:ring-[#0680d0] focus-visible:bg-[#71c1f6] outline-none rounded-md mt-2 px-3 py-2 placeholder:text-[#54b7fa] placeholder:text-sm"
            placeholder="Locality/Town*"
            {...register("addressLine2", {
              required: false,
            })}
          />
          <div className="flex gap-3 justify-between">
            <div className="flex flex-col w-full">
              <select
                {...register("city", {
                  required: "*Please select a city/district",
                })}
                className="mt-2 px-3 py-2 rounded-md text-[#54b7fa] border-[1px] border-[#54b7fa] focus:outline-none focus:ring-1 focus:ring-[#0680d0]"
              >
                <option value="" disabled>
                  City/District*
                </option>
                <option value="Ujjain">Ujjain</option>
              </select>

              {errors.city && (
                <span className="text-sm text-[#0680d0]">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <select
                {...register("state", {
                  required: "*Please select a state",
                })}
                className="mt-2 px-3 py-2 rounded-md text-[#54b7fa] border-[1px] border-[#54b7fa] focus:outline-none focus:ring-1 focus:ring-[#0680d0] "
              >
                <option value="" disabled>
                  State*
                </option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
              </select>
              {errors.state && (
                <span className="text-sm text-[#0680d0]">
                  {errors.state.message}
                </span>
              )}
            </div>
          </div>
          <h3 className="pb-2 pt-6 font-semibold uppercase">Address Type</h3>
          <div className="flex flex-row gap-5">
            <div className="flex justify-center gap-3">
              <label>
                <input
                  type="radio"
                  name="addresstype"
                  value="home"
                  {...register("addressType")}
                  className="accent-[#0680d0] mr-2"
                />
                Home
              </label>
            </div>
            <div className="flex justify-center gap-3">
              <label>
                <input
                  type="radio"
                  name="addresstype"
                  value="office"
                  {...register("addressType")}
                  className="accent-[#0680d0] mr-2"
                />
                Office
              </label>
            </div>
          </div>
          <div className="flex flex-row gap-2 my-4">
            <button
              className="w-full hover:bg-[#71c1f6] border-[1px] border-[#54b7fa] focus:ring-2 focus:ring-[#0680d0] outline-none rounded-md mt-2 px-3 py-2"
              onClick={() => reset()}
            >
              Cancle
            </button>
            <button
              className="w-full bg-[#0680d0] hover:bg-[#44b1f9] text-white border-[1px] border-[#54b7fa] focus:ring-2 focus:ring-[#0680d0] outline-none rounded-md mt-2 px-3 py-2"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="priceDetails w-[30%]">
        <DisplayPriceDetails />
      </div>
    </div>
  );
};

export default GetAddressContent;
