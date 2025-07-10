import { useEffect, useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import { Headers as HEADERS } from "../../../constans/tableHeaders.constant";

import { CourtsTableData, PaginatedCourtsData } from "../../../types/CourtsData.interface";
import markerService from "../../../firebase/marker.service";

export default function test() {
  const [courtsData, setCourtsData] = useState<CourtsTableData[]>([]);
  const [lastCourtCalled, setLastCourtCalled] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [columns, setColumns] = useState<{id: string, name: string}[]>();

  useEffect(() => {
    const fetchCourtsData = async () => {
      const courtsTableData: PaginatedCourtsData =
        await markerService.getPaginatedCourtsData(lastCourtCalled);
      setCourtsData(courtsTableData.courtsData);
      setLastCourtCalled(courtsTableData.lastCourtCalled);

      const headers = Object.keys(courtsTableData.courtsData[0]);
      const computedColumns = headers.map((header) => {
        return { id: header, name: HEADERS[header as keyof typeof HEADERS], width: "150px" };
      });

      setColumns(computedColumns);
    };
    fetchCourtsData();
  }, []);

  return (
    <div className="overflow-scroll max-w-full lg:mx-12">
      <Grid
        //@ts-ignore
        data={courtsData}
        columns={columns}
        search={true}
        pagination={{
          limit: 5,
        }}
        autoWidth={false}
      />
    </div>
  );
}
