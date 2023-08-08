import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { traslate } from './services/traslate'
import { useDebounce } from './hooks/useDebounce'

// google-traslate-clone

function App () {
  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 250)

  useEffect(() => {
    if (debouncedFromText === '') return
    traslate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
      <Container fluid>
        <h2>Google Traslate</h2>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
                />
              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
            </Stack>
          </Col>
          <Col xs='auto'>
            <Button
              variant='link'
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguages}
            >
              <ArrowsIcon/>
            </Button>
          </Col>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />
              <div style={{ position: 'relative' }}>
                <TextArea
                  loading={loading}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                />
                <Button
                  variant='link'
                  style={{ position: 'absolute', left: 0, bottom: 0 }}
                  onClick={ () => { handleClipboard() }}>
                  <ClipboardIcon/>
                </Button>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
  )
}

export default App
