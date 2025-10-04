declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export interface CrispUserData {
  email?: string;
  name?: string;
  avatar?: string;
  company?: {
    name?: string;
  };
  [key: string]: any;
}

export interface CrispSegment {
  [key: string]: string | number | boolean;
}

/**
 * Show the Crisp chat widget
 */
export const showCrisp = (): void => {
  if (typeof window !== "undefined" && window.$crisp) {
    window.$crisp.push(["do", "chat:show"]);
  }
};

/**
 * Hide the Crisp chat widget
 */
export const hideCrisp = (): void => {
  if (typeof window !== "undefined" && window.$crisp) {
    window.$crisp.push(["do", "chat:hide"]);
  }
};

/**
 * Open the Crisp chat box
 */
export const openCrisp = (): void => {
  if (typeof window !== "undefined" && window.$crisp) {
    window.$crisp.push(["do", "chat:open"]);
  }
};

/**
 * Close the Crisp chat box
 */
export const closeCrisp = (): void => {
  if (typeof window !== "undefined" && window.$crisp) {
    window.$crisp.push(["do", "chat:close"]);
  }
};

/**
 * Set user data in Crisp for personalized support
 */
export const setCrispUserData = (data: CrispUserData): void => {
  if (typeof window !== "undefined" && window.$crisp) {
    if (data.email) {
      window.$crisp.push(["set", "user:email", [data.email]]);
    }

    if (data.name) {
      window.$crisp.push(["set", "user:nickname", [data.name]]);
    }

    if (data.avatar) {
      window.$crisp.push(["set", "user:avatar", [data.avatar]]);
    }

    if (data.company?.name) {
      window.$crisp.push(["set", "user:company", [data.company.name]]);
    }

    // Set any additional custom data
    const customData = { ...data };
    delete customData.email;
    delete customData.name;
    delete customData.avatar;
    delete customData.company;

    if (Object.keys(customData).length > 0) {
      Object.entries(customData).forEach(([key, value]) => {
        window.$crisp.push(["set", "session:data", [[key, value]]]);
      });
    }
  }
};

/**
 * Send a custom event to Crisp
 */
export const sendCrispEvent = (
  eventName: string,
  data?: Record<string, any>
): void => {
  if (typeof window !== "undefined" && window.$crisp) {
    window.$crisp.push(["set", "session:event", [[eventName, data || {}]]]);
  }
};

/**
 * Set session segments for user categorization
 */
export const setCrispSegments = (segments: CrispSegment): void => {
  if (typeof window !== "undefined" && window.$crisp) {
    Object.entries(segments).forEach(([key, value]) => {
      window.$crisp.push(["set", "session:segments", [[key, value]]]);
    });
  }
};

/**
 * Reset the Crisp session (useful on logout)
 */
export const resetCrisp = (): void => {
  if (typeof window !== "undefined" && window.$crisp) {
    window.$crisp.push(["do", "session:reset"]);
  }
};

/**
 * Send a message to the chat
 */
export const sendCrispMessage = (message: string): void => {
  if (typeof window !== "undefined" && window.$crisp) {
    window.$crisp.push(["do", "message:send", ["text", message]]);
  }
};

/**
 * Check if Crisp is loaded
 */
export const isCrispLoaded = (): boolean => {
  return typeof window !== "undefined" && !!window.$crisp;
};
