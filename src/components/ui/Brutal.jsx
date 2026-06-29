import React from "react";
import { ArrowUpRight } from "lucide-react";

const variantAliases = {
  primary: "primary",
  secondary: "secondary",
  dark: "dark",
  white: "white",
  yellow: "yellow",
  green: "green",
  black: "black",
  purple: "purple",
  pink: "pink",
  blue: "blue",
};

const variantClass = (variant = "white") =>
  `brutal-surface--${variantAliases[variant] || "white"}`;

export const BrutalButton = ({
  as: Component = "a",
  variant,
  color,
  className = "",
  children,
  icon: Icon = ArrowUpRight,
  ...props
}) =>
  React.createElement(
    Component,
    {
      className: `brutal-button ${variantClass(variant || color || "primary")} ${className}`,
      ...props,
    },
    <>
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" size={18} strokeWidth={3} /> : null}
    </>
  );

export const Badge = ({ variant, color, className = "", children }) => (
  <span className={`brutal-badge ${variantClass(variant || color || "primary")} ${className}`}>
    {children}
  </span>
);

export const BrutalCard = ({
  as: Component = "div",
  variant,
  color,
  label,
  labelVariant = "dark",
  className = "",
  children,
  ...props
}) =>
  React.createElement(
    Component,
    {
      className: `brutal-card ${variantClass(variant || color || "white")} ${label ? "pt-8" : ""} ${className}`,
      ...props,
    },
    <>
      {label ? <Badge variant={labelVariant} className="brutal-card__label">{label}</Badge> : null}
      {children}
    </>
  );

export const SectionHeader = ({
  id,
  label,
  kicker,
  title,
  subtitle,
  description,
  labelVariant,
  color,
  className = "",
}) => (
  <div className={`section-header ${className}`}>
    {label || kicker ? <Badge variant={labelVariant || color || "primary"}>{label || kicker}</Badge> : null}
    <h2 id={id}>{title}</h2>
    {subtitle || description ? <p>{subtitle || description}</p> : null}
  </div>
);

export const StatBlock = ({ value, label, variant, color = "white", className = "" }) => (
  <BrutalCard variant={variant || color} className={`stat-block ${className}`}>
    <p className="stat-block__value">{value}</p>
    <p className="stat-block__label">{label}</p>
  </BrutalCard>
);

export const StatPill = StatBlock;
