import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

export default function TermsAndConditions (props) {
  return (
    <Card sx={{ padding: 5, height: '1000px', overflow: 'auto' }} >
        <Typography
            variant="h4"
            align="center"
            sx={{ marginBottom: '1rem' }}
        >
            Términos y condiciones
        </Typography>
        <Typography align="justify">
            Bienvenido/a a nuestra aplicación de estimación de riesgo cardiovascular.
            Antes de utilizar esta aplicación, te pedimos que leas detenidamente los
            siguientes términos y condiciones. Al acceder y utilizar nuestra aplicación,
            aceptas cumplir con estos términos y condiciones,
            así como con nuestras políticas de privacidad.
        </Typography>
        <Typography
            variant="h6"
            align="left"
            sx={{ marginTop: '1rem' }}
        >
            1. Información y Propósito
        </Typography>
        <Typography align="justify">
            La aplicación de estimación de riesgo cardiovascular tiene como objetivo
            proporcionar una estimación general del riesgo cardiovascular de los usuarios,
            basada en la información proporcionada por ellos. Esta estimación se basa en
            algoritmos y modelos científicos, pero no reemplaza el consejo médico profesional
            ni un diagnóstico médico completo. Te recomendamos encarecidamente que consultes
            a un profesional de la salud para una evaluación completa de tu riesgo cardiovascular.
        </Typography>
        <Typography
            variant="h6"
            align="left"
            sx={{ marginTop: '1rem' }}
        >
            2. Privacidad y Confidencialidad
        </Typography>
        <Typography align="justify" sx={{ marginBottom: 1 }}>
            Valoramos tu privacidad y nos comprometemos a protegerla. Al utilizar nuestra
            aplicación, aceptas nuestras políticas de privacidad que describen cómo recopilamos,
            utilizamos y protegemos tu información personal. Te recomendamos leer nuestras
            políticas de privacidad para comprender cómo manejamos tus datos.
        </Typography>
        <Typography
            variant="h8"
            align="left"
            sx={{ fontStyle: 'italic' }}
        >
            2.1 Información recopilada
        </Typography>
        <Typography align="justify" sx={{ marginBottom: 1 }}>
            Para brindarte una estimación precisa del riesgo cardiovascular,
            recopilamos cierta información personal. Esto puede incluir datos como
            tu edad, género, antecedentes médicos, hábitos de vida y otros factores
            relevantes. Esta información es utilizada exclusivamente para generar la
            estimación del puntaje cardiovascular y ofrecerte recomendaciones personalizadas.
        </Typography>
        <Typography
            variant="h8"
            align="left"
            sx={{ fontStyle: 'italic' }}
        >
            2.2 Seguridad de la Información
        </Typography>
        <Typography align="justify" sx={{ marginBottom: 1 }}>
            Tomamos medidas de seguridad para proteger tu información personal
            contra el acceso no autorizado, el uso indebido o la divulgación.
            Utilizamos métodos seguros para la transmisión y el almacenamiento
            de datos, siguiendo las mejores prácticas de seguridad de la industria.
        </Typography>
        <Typography
            variant="h8"
            align="left"
            sx={{ fontStyle: 'italic' }}
        >
            2.3 Mejora y Nuevos Estudios
        </Typography>
        <Typography align="justify" sx={{ marginBottom: 1 }}>
            Buscamos constantemente mejorar nuestra aplicación y los resultados que
            proporcionamos. En ocasiones, podemos utilizar datos anonimizados y agregados
            para llevar a cabo nuevos estudios e investigaciones en el campo de la salud
            cardiovascular. Estos estudios tienen como objetivo obtener mejores resultados
            y contribuir al avance de la ciencia médica. Sin embargo, en estos casos, nunca se
            revelarán detalles de identificación personal.
        </Typography>
        <Typography align="left" sx={{ marginY: 1 }}>
            Si no estás de acuerdo con alguno de estos términos y condiciones, te pedimos que
            no utilices nuestra aplicación.
        </Typography>
        <Container align="center">
            <Button variant='contained' onClick={props.handleButtonClick}>
                Acepto
            </Button>
        </Container>
    </Card>
  )
}
