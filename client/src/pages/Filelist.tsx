import React, { useEffect, useState } from 'react';
import { useGlobalState, useGlobalDispatch } from '../context/GlobalContext';
import { useTable, useSortBy, useGlobalFilter, Column } from 'react-table';
import { FileType } from '../interfaces/types';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';


const FilesList: React.FC = () => {
  const { files } = useGlobalState();
  const globalDispatch = useGlobalDispatch();
  const [filteredFiles, setFilteredFiles] = useState<FileType[]>([])
  const [searchText, setSearchText] = useState('');
  const [parents, setParents] = useState<string | null>('');
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);



  useEffect(() => {
    // TODO: fetch files, set filteredFiles on success
    // use filteredFiles for the table and search on files
    //set filteredFiles to files back on reset
    setFilteredFiles(files) //onfetch success
  }, []);

  useEffect(() => {
    setParents(params.get("parents"));
  }, [location.search])

  const searchTable = (e: string) => {
    setSearchText(e);
    let filtered = files.filter(x => x.name.toLowerCase().includes(e.toLowerCase()));
    setFilteredFiles(filtered);
  }

  const getHumanReadableSize = (bytes: number): string => {
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) return '0 Byte';

    const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return (Math.round((bytes / Math.pow(1024, i)) * 100) / 100).toFixed(2) + ' ' + sizes[i];
  }

  const fetchFolderFile = (file: FileType) => {
    if (file.type != "dir") return;
    //TODO: fetch file using using Id
    navigate(getNewURLPath(file.id));
      console.log("fetch dir")
  }

  const getNewURLPath = (parentId: number): string => {
    const currentPath =location.pathname+location.search;
    if (currentPath.includes("parents") && !parents?.length) {
      return `${currentPath}${parentId}`
    } else if (currentPath.includes("parents")) {
      return `${currentPath},${parentId}`
    } else {
      return `${currentPath}?parents=${parentId}`
    }

  }


  return (
    <TableContainer >
      <StyleInput
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => searchTable(e.target.value)}
      />
      {/* use a datatable for sorting */}
      <StyledTable style={{ width: '100%' }}>
        <thead>
          <tr>
            <StyledHeader>S/N  🔽</StyledHeader>
            <StyledHeader>Name</StyledHeader>
            <StyledHeader>Type</StyledHeader>
            <StyledHeader>Size</StyledHeader>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file, index) => {
            return <StyledRow onClick={() => fetchFolderFile(file)} clickable={file.type == 'dir'}>
              <StyledData>{index + 1}</StyledData>
              <StyledData>{file.name}</StyledData>
              <StyledData>{file.type == 'dir' ? 'Folder' : 'File'}</StyledData>
              <StyledData>{file.size == 0 ? '-' : getHumanReadableSize(file.size)}</StyledData>
            </StyledRow>
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

const TableContainer = styled.table`
  width: 500px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const StyledHeader = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
`;

const StyledRow = styled.tr<{ clickable?: boolean }>`
  cursor: ${(props) => (props.clickable ? 'pointer' : 'initial')};
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color:${(props) => (props.clickable ? '#e6e6e6' : '#none')};
  }
`;

const StyleInput = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ced4da; 
  border-radius: 5px;
  font-size: 16px;
`;

const StyledData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

export default FilesList;