import React from "react";
import styled from "styled-components";
import { IoLogoOctocat } from "react-icons/io5";

export default function Switch({ checked, onChange }) {
  return (
    <StyledWrapper>
      <div className="container">
        <input
          type="checkbox"
          id="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        <label htmlFor="checkbox" className="label">
          <div className="knob">
            {/* This is where the icon lives. It's hidden by default. */}
            <IoLogoOctocat className="icon" />
          </div>
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    /* you can center or size this as needed */
    display: inline-flex;
    align-items: center;
  }

  /* Hide the real checkbox */
  #checkbox {
    display: none;
  }

  /* The “track” of the switch */
  .label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 120px;
    height: 60px;
    background-color: #ffffff;
    border-radius: 30px;
    box-shadow:
      inset 0 0 5px 4px rgba(255, 255, 255, 1),
      inset 0 0 20px 1px rgba(0, 0, 0, 0.488),
      10px 20px 30px rgba(0, 0, 0, 0.096),
      inset 0 0 0 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    position: relative;
    transition: transform 0.4s;
  }

  /* Tilt on hover */
  .label:hover {
    transform: perspective(100px) rotateX(5deg) rotateY(-5deg);
  }

  /* Flip tilt when checked */
  #checkbox:checked ~ .label:hover {
    transform: perspective(100px) rotateX(-5deg) rotateY(5deg);
  }

  /* The knob (circle) container */
  .knob {
    position: absolute;
    top: 10px;           /* 10px down from top of .label (to center vertically) */
    left: 10px;          /* initial left offset */
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(130deg, #757272 10%, #ffffff 11%, #726f6f 62%);
    box-shadow:
      0 2px 1px rgba(0, 0, 0, 0.3),
      10px 10px 10px rgba(0, 0, 0, 0.3);
    transition: left 0.4s, background-image 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* ensure icon is clipped to the circle */
  }

  /* When checked, slide knob to the right and change its gradient */
  #checkbox:checked ~ .label .knob {
    left: 70px; /* 120px (label width) − 40px (knob width) − 10px padding */
    background: linear-gradient(130deg, black 10%, black 11%, black 62%);

  }

  /* The icon inside the knob: hidden by default */
  .icon {
    color: white;       /* color of IoLogoOctocat */
    width: 24px;
    height: 24px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  /* When checked, fade the icon in */
  #checkbox:checked ~ .label .knob .icon {
    opacity: 1;
  }
`;