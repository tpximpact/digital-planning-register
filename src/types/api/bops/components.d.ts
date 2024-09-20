export interface BopsBaseApplicant {
  name: {
    first: string;
    last: string;
    title: string;
  };
  type: "individual" | "company" | "charity" | "public" | "parishCouncil";
  ownership?: {
    interest:
      | "owner"
      | "owner.sole"
      | "owner.co"
      | "tenant"
      | "occupier"
      | "other";
  };
  company?: {
    name: string;
  };
  address:
    | {
        sameAsSiteAddress: true;
      }
    | {
        sameAsSiteAddress: false;
        country?: string;
        county?: string;
        line1: string;
        line2?: string;
        postcode: string;
        town: string;
      };
}

export interface BopsAgent {
  name: {
    first: string;
    last: string;
    title: string;
  };
  type: "individual" | "company" | "charity" | "public" | "parishCouncil";
  ownership?: {
    interest:
      | "owner"
      | "owner.sole"
      | "owner.co"
      | "tenant"
      | "occupier"
      | "other";
  };
  company?: {
    name: string;
  };
  address:
    | {
        sameAsSiteAddress: true;
      }
    | {
        sameAsSiteAddress: false;
        country?: string;
        county?: string;
        line1: string;
        line2?: string;
        postcode: string;
        town: string;
      };
  agent: {
    name: {
      first: string;
      last: string;
      /**
       * Should we use this
       */
      title: string;
    };

    company?: {
      name: string;
    };

    /**
     * Address
     */
    address: {
      country?: string;
      county?: string;
      line1: string;
      line2?: string;
      postcode: string;
      town: string;
    };
  };
}
