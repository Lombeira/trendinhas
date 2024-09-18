import { config } from "./config";

export const pageview = url => {
  window.gtag("config", config.gtag, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};