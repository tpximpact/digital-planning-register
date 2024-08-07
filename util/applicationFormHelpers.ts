import Map from "@/components/map";
function validateValue(description: any, value: any) {
  const desc: any = {
    EPC: value.known,
    type: value?.description,
    region: value,
    address: value?.singleLine,
    "Coordinates (lat, long)": `${value?.latitude}, ${value?.longitude}`,
    UPRN: value.uprn,
    USRN: value.usrn,
    parking: validateParking(value),
    boundary: `${value.area?.squareMetres} m2 / ${value.area?.hectares} hectares`,
    planning: `${value.designations?.map((el: any) => el.description)}`,
    titleNumber: value.known,
    localAuthorityDistrict: value,
    property_boundary: validateMap(value.site),
  };
  return desc[description] || value;
}

function validateMap(value: any) {
  const boundaryGeojson = value;

  let geometryType: "Polygon" | "MultiPolygon" | undefined;
  let coordinates: number[][][] | number[][][][] | undefined;

  if (boundaryGeojson?.type === "Feature") {
    geometryType = boundaryGeojson.geometry?.type;
    coordinates = boundaryGeojson.geometry?.coordinates;
  } else if (boundaryGeojson?.type === "FeatureCollection") {
    const features = boundaryGeojson.features;
    if (features && features.length > 0) {
      geometryType = features[0].geometry?.type;
      coordinates = features[0].geometry?.coordinates;
    }
  }
  const geojsonData =
    geometryType && coordinates
      ? JSON.stringify({
          type: "Feature",
          geometry: {
            type: geometryType,
            coordinates,
          },
        })
      : null;

// return <Map geojsonData={JSON.stringify({
//                 type: "Feature",
//                 geometry: {
//                   type: geometryType,
//                   coordinates,
//                 },
//               })}/>
}
function validateParking(value: any) {
  return [
    { cars: value.cars?.count },
    { vans: value.vans?.count },
    { buses: value.buses?.count },
    { other: value.other?.count },
    { cycles: value.cycles?.count },
    { carClub: value.carClub?.count },
    { disabled: value.disabled?.count },
    { offStreet: value.offStreet?.residential?.count },
    { motorcycles: value.motorcycles?.count },
  ];
}
function validateDescription(description: any) {
  const desc: any = {
    type: "Property type",
    boundary: "Area",
    planning: "Planning designations",
    titleNumber: "Title number",
    localAuthorityDistrict: "Local authority",
    property_boundary: "Property boundary",
  };

  return desc[description] || description;
}

export function descriptionForm(data: any) {
  let description: any = [];
  console.log(data);
  // {description: x, value: y || [y,x,z]}
  data.forEach((element: any) => {
    if (element.description == "address") {
      description.push(
        {
          description: validateDescription(element["description"]),
          value: validateValue(element.description, element.value),
        },
        {
          description: validateDescription("Coordinates (lat, long)"),
          value: validateValue("Coordinates (lat, long)", element.value),
        },
        {
          description: validateDescription("UPRN"),
          value: validateValue("UPRN", element.value),
        },
        {
          description: validateDescription("USRN"),
          value: validateValue("USRN", element.value),
        },
        {
          description: validateDescription("property_boundary"),
          value: validateValue("property_boundary", element.value),
        },
      );
    } else {
      console.log(element.value);
      description.push({
        description: validateDescription(element["description"]),
        value: validateValue(element.description, element.value),
      });
    }
  });

  return description;
}
