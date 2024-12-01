import { Button } from '@mui/material'
import s from './Page404.module.css'
import { Link } from 'react-router'
import { Path } from 'components/common/routing/routing'

export const Page404 = () => {
    return (
        <>
            <h1 className={s.title}>404</h1>
            <h2 className={s.subTitle}>page not found</h2>
            <div className={s.buttonContainer}>
                <Button
                    component={Link}
                    to={Path.Main}
                    variant="contained"
                    size='large'>
                    To the main page
                </Button>
            </div>
        </>
    )
}