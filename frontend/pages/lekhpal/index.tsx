import { Box, Grid } from "@chakra-ui/react"
import { NextPage } from "next"

const LandInspectorDashboard : NextPage = () => {
    return (
        <Grid h="full" placeItems={"center"}>
            <Box fontSize={"3xl"}>
                Hello Mr Land Inspector
            </Box>
        </Grid>
    )
}

export default LandInspectorDashboard