import React from "react";
import Select from "@/components/ui/Select";
import { useGeoStates } from "../hooks/geo/useGeoStates";
import { useGeoDistricts } from "../hooks/geo/useGeoDistricts";
import { useGeoTaluks } from "../hooks/geo/useGeoTaluks";

export default function GeoSelectors({ formik, disabled = false, required = false, layout = "grid" }) {
  const { values, setFieldValue, touched, errors, handleBlur } = formik;

  const { data: states, isLoading: isLoadingStates, isError: isErrorStates } = useGeoStates();
  const { data: districts, isLoading: isLoadingDistricts, isError: isErrorDistricts } = useGeoDistricts(values.state);
  const { data: taluks, isLoading: isLoadingTaluks, isError: isErrorTaluks } = useGeoTaluks(values.district);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setFieldValue("state", newState);
    // Cascade reset
    setFieldValue("district", "");
    setFieldValue("taluk", "");
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setFieldValue("district", newDistrict);
    // Cascade reset
    setFieldValue("taluk", "");
  };

  const handleTalukChange = (e) => {
    setFieldValue("taluk", e.target.value);
  };

  const hasError = isErrorStates || isErrorDistricts || isErrorTaluks;

  if (hasError) {
    return (
      <div className="col-span-full text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
        Unable to load locations. Please try again.
      </div>
    );
  }

  const wrapperClass = layout === "grid" 
    ? "grid grid-cols-1 sm:grid-cols-3 gap-4 col-span-full" 
    : "flex flex-col gap-6 w-full"; // "compact" layout for drawer

  return (
    <div className={wrapperClass}>
      <Select
        label="State"
        name="state"
        value={values.state}
        onChange={handleStateChange}
        onBlur={handleBlur}
        options={states || []}
        placeholder={isLoadingStates ? "Loading states..." : "Select State"}
        disabled={disabled || isLoadingStates}
        required={required}
        error={touched.state && errors.state}
      />
      
      <Select
        label="District"
        name="district"
        value={values.district}
        onChange={handleDistrictChange}
        onBlur={handleBlur}
        options={districts || []}
        placeholder={isLoadingDistricts ? "Loading districts..." : "Select District"}
        disabled={disabled || !values.state || isLoadingDistricts}
        required={required}
        error={touched.district && errors.district}
      />
      
      <Select
        label="Taluk"
        name="taluk"
        value={values.taluk}
        onChange={handleTalukChange}
        onBlur={handleBlur}
        options={taluks || []}
        placeholder={isLoadingTaluks ? "Loading taluks..." : "Select Taluk"}
        disabled={disabled || !values.district || isLoadingTaluks}
        required={required}
        error={touched.taluk && errors.taluk}
      />
    </div>
  );
}
