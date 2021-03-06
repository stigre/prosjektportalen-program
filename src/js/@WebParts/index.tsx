import WebPartComponent from "prosjektportalen/lib/WebParts/WebPartComponent";
import ProgramAddProject, { IProgramAddProjectProps } from "./ProgramAddProject";
import ProgramProjectsTimelineSync, { IProgramProjectsTimelineSyncProps } from "./ProgramProjectsTimelineSync";
import ProgramProjectStatus, { IProgramProjectStatusProps } from "./ProgramProjectStatus";
import ProgramPortfolio, { IProgramPortfolioProps } from "./ProgramPortfolio";
import ProgramBenefitsOverview, { IProgramBenefitsOverviewProps } from "./ProgramBenefitsOverview";

/**
 * An array containing WebPartComponents
 */
const WebPartComponents: WebPartComponent<any>[] = [
    new WebPartComponent<IProgramAddProjectProps>(ProgramAddProject, "pp-program-findproject", {}),
    new WebPartComponent<IProgramProjectsTimelineSyncProps>(ProgramProjectsTimelineSync, "pp-program-projectstimelinesync", {}),
    new WebPartComponent<IProgramProjectStatusProps>(ProgramProjectStatus, "pp-program-projectstatus", {}),
    new WebPartComponent<IProgramPortfolioProps>(ProgramPortfolio, "pp-program-portfolio", {}),
    new WebPartComponent<IProgramBenefitsOverviewProps>(ProgramBenefitsOverview, "pp-program-benefitsoverview", {}),
];
/**
 * Render the webparts
 */
export const Render = () => {
    WebPartComponents.forEach(wpc => wpc.renderOnPage());
};
