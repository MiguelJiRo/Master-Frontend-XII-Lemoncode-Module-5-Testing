import { mapProjectFromApiToVm } from './project.mapper';
import { Project, EmployeeSummary } from './api/project.api-model';
import { createEmptyProject } from './project.vm';
import { mockProject } from './api/project.mock-data';

describe('./pods/project/mapper', () => {
  it('debe devolver un proyecto vacio si se usa un proyecto undefined', () => {
    // Arrange
    const project: Project = undefined;
    const emptyProject = createEmptyProject();
    // Act
    const result = mapProjectFromApiToVm(project);
    // Assert
    expect(result).toEqual(emptyProject);
  });

  it('debe devolver un proyecto vacio si se usa un proyecto null', () => {
    // Arrange
    const project: Project = null;
    const emptyProject = createEmptyProject();
    // Act
    const result = mapProjectFromApiToVm(project);
    // Assert
    expect(result).toEqual(emptyProject);

  });

  it('debe devolver un proyecto con las mismas propiedades que el proyecto usado', () => {
    // Arrange
    const mockEmployeeSummaryList: EmployeeSummary[] = [
      {
        id: '1',
        employeeName: 'Daniel Perez',
        isAssigned: true,
      },
      {
        id: '2',
        employeeName: 'Jose Sanchez',
        isAssigned: false,
      },
      {
        id: '3',
        employeeName: 'Javier Benitez',
        isAssigned: false,
      },
      {
        id: '4',
        employeeName: 'María Peña',
        isAssigned: true,
      },
    ];
    const project: Project = {
      id: '1',
      name: 'Nombre',
      isActive: true,
      comments: 'Comentario',
      externalId: '1234',
      employees: mockEmployeeSummaryList,
    };
    // Act
    const result = mapProjectFromApiToVm(project);
    // Assert
    expect(result).toEqual(mockProject);
  });

  it('debe devolver un proyecto vacio usando el metodo de createEmptyProject', () => {
    const project = createEmptyProject();
    const modelProject = mapProjectFromApiToVm(project);
    expect(modelProject).toEqual(createEmptyProject());
  });
});
