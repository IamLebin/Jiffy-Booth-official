import {Box, Card, Flex, Text} from '@sanity/ui'
import type {NavbarProps} from 'sanity'

function PhotoStripMark() {
  return (
    <Flex gap={1} aria-hidden="true">
      {['#F5EBE1', '#B9D9E8', '#9B5744'].map((color) => (
        <Box
          key={color}
          style={{width: 5, height: 18, borderRadius: 3, backgroundColor: color}}
        />
      ))}
    </Flex>
  )
}

export function StudioNavbar(props: NavbarProps) {
  return (
    <>
      <Card
        paddingX={4}
        paddingY={3}
        style={{background: '#1C2431', borderBottom: '1px solid rgba(255,255,255,.08)'}}
      >
        <Flex align="center" justify="space-between" gap={4}>
          <Flex align="center" gap={3}>
            <PhotoStripMark />
            <Text
              size={1}
              weight="semibold"
              style={{color: '#F5EBE1', letterSpacing: '0.14em'}}
            >
              JIFFY BOOTH
            </Text>
          </Flex>
          <Text size={1} style={{color: '#B9D9E8', letterSpacing: '0.06em'}}>
            CONTENT STUDIO
          </Text>
        </Flex>
      </Card>
      {props.renderDefault(props)}
    </>
  )
}
