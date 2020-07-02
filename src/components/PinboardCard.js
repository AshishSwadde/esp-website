import React, { useState } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import { ButtonExternalLink } from "./SharedStyledComponents"
import {
  colorOrange,
  colorRed,
  colorGrayLight,
  colorGrayDark,
  colorGrayDarkest,
  screenSizeS,
} from "../utils/styles"

const Title = styled.h4`
  margin-bottom: 8px;
  color: ${colorGrayDarkest};
`

const Subtitle = styled.p`
  color: ${colorGrayLight};
`

const FakeLink = styled.div`
  cursor: pointer;
  font-weight: bold;
  color: ${colorOrange};

  &:hover {
    color: ${colorRed};
  }
`

const StyledOverlay = styled(motion.div)`
  cursor: pointer;
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  will-change: opacity;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`

const Overlay = ({ isActive }) => {
  return (
    <StyledOverlay
      initial={false}
      animate={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 300 : -1 }}
      transition={{ duration: 0.2 }}
    />
  )
}

const openSpring = { type: "spring", stiffness: 100, damping: 30 }
const closeSpring = { type: "spring", stiffness: 200, damping: 35 }

const Card = styled(motion.div)`
  height: 200px;
  flex: 0 1 45%;
  margin-bottom: 32px;
  margin-right: 32px;

  @media (max-width: 824px) {
    flex: 0 1 324px;
  }
  @media (max-width: ${screenSizeS}) {
    flex: 1 1 200px;
    margin-right: 0px;
    margin-bottom: 24px;
  }
`

const CardContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  pointer-events: none;

  &.open {
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 1000;
    overflow: hidden;
    padding: 10% 0;
  }
`

const CardContent = styled(motion.div)`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px ${colorGrayDark};
  padding: 1rem;
  cursor: pointer;

  z-index: 0;
  transform: none;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  &.open {
    height: auto;
    max-height: 100%;
    z-index: 1000;
    max-width: 700px;
    overflow: scroll;
    cursor: auto;
    padding: 2rem;
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const CardIcon = styled(FontAwesomeIcon)`
  z-index: 2000;
  cursor: pointer;
`

const ButtonContainer = styled.div``

// TODO createRef on card to close when user clicks outside of card
const PinboardCard = ({ pin }) => {
  const [isSelected, setIsSelected] = useState(false)

  const title = pin.fields["Title"]
  const desc = pin.fields["Short Description"]
  const longDesc = pin.fields["Long Description"]
  const truncatedDesc = desc.slice(0, 90) + "..."

  const handleSelect = e => {
    // If user clicks on "X" icon, close card & overlay
    if (e.target.tagName === "path") {
      setIsSelected(false)
    } else {
      setIsSelected(true)
    }
  }

  return (
    <Card>
      <Overlay isActive={isSelected} />
      <CardContentContainer className={isSelected ? "open" : "closed"}>
        <CardContent
          className={isSelected ? "open" : "closed"}
          layoutTransition={isSelected ? openSpring : closeSpring}
          onClick={handleSelect}
        >
          <div>
            <CardHeader>
              <Title>{title}</Title>
              {isSelected && <CardIcon icon={faTimes} size="lg" />}
            </CardHeader>
            {!isSelected && <Subtitle>{truncatedDesc}</Subtitle>}
            {isSelected && <Subtitle>{desc}</Subtitle>}
            {isSelected && <Subtitle>{longDesc}</Subtitle>}
            {isSelected && <Subtitle>{longDesc}</Subtitle>}
            {isSelected && <Subtitle>{longDesc}</Subtitle>}
          </div>
          {!isSelected && <FakeLink>View Details</FakeLink>}
          {isSelected && (
            <ButtonContainer>
              <ButtonExternalLink
                href="https://airtable.com/shrS0J3GQJms4w4Dz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply
              </ButtonExternalLink>
            </ButtonContainer>
          )}
        </CardContent>
      </CardContentContainer>
    </Card>
  )
}

export default PinboardCard