/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect, useRef, useState } from 'react';
import DialogHeader from '../Dialogs/DialogHeader';
import DialogBody from '../Dialogs/DialogBody';
import { fetchContentXML, writeContent } from '../../services/content';
import { ConditionalLoadingState } from '../SystemStatus/LoadingState';
import AceEditor from '../AceEditor';
import { useContentTypes, useUnmount } from '../../utils/hooks';
import useStyles from './styles';
import { CodeEditorDialogProps } from './CodeEditorDialog';
import { useDispatch } from 'react-redux';
import { updateCodeEditorDialog } from '../../state/actions/dialogs';
import useTheme from '@material-ui/core/styles/useTheme';
import { Skeleton } from '@material-ui/lab';
import DialogFooter from '../Dialogs/DialogFooter';
import SecondaryButton from '../SecondaryButton';
import { FormattedMessage, useIntl } from 'react-intl';
import { getParentPath } from '../../utils/path';
import { showErrorDialog } from '../../state/reducers/dialogs/error';
import { showSystemNotification } from '../../state/actions/system';
import translations from './translations';
import SplitButton from '../Controls/SplitButton';
import { DetailedItem } from '../../models/Item';
import User from '../../models/User';
import { freemarkerSnippets, groovySnippets } from './utils';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { ListSubheader } from '@material-ui/core';
import LookupTable from '../../models/LookupTable';
import { dasherize, isCamelCase, underscore } from '../../utils/string';

export interface CodeEditorDialogContainerProps extends CodeEditorDialogProps {
  item: DetailedItem;
  site: string;
  user: User;
  title: string;
  onMinimized(): void;
}

export function CodeEditorDialogContainer(props: CodeEditorDialogContainerProps) {
  const { item, user, site, onMinimized, onClose, onClosed, mode, readonly = false, contentType } = props;
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const classes = useStyles();
  const editorRef = useRef<any>();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const contentTypes = useContentTypes();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [snippets, setSnippets] = useState<LookupTable<{ label: string; value: string }>>(
    mode === 'ftl' || mode === 'groovy' ? (mode === 'ftl' ? freemarkerSnippets : groovySnippets) : {}
  );
  const [contentModelSnippets, setContentModelSnippets] = useState<{ label: string; value: string }[]>(null);

  // add content model variables
  useEffect(() => {
    if (contentTypes && item) {
      const _contentType = contentType
        ? contentType
        : Object.values(contentTypes).find((contentType) => contentType.displayTemplate === item.path)?.id;
      if (_contentType) {
        const fields = contentTypes[_contentType].fields;
        if (mode === 'ftl') {
          if (freemarkerSnippets['content-variable']) {
            let { 'content-variable': contentVariable, ...rest } = freemarkerSnippets;
            setSnippets(rest);
            const snippets = Object.keys(fields).map((key) => ({
              label: fields[key].name,
              value: contentVariable.value.replace(
                'VARIABLENAME',
                isCamelCase(fields[key].id) ? `["${dasherize(underscore(fields[key].id))}"]` : fields[key].id
              )
            }));
            setContentModelSnippets(snippets);
          }
        } else if (mode === 'groovy') {
          if (groovySnippets['access-content-model']) {
            let { 'access-content-model': contentVariable, ...rest } = groovySnippets;
            setSnippets(rest);
            const snippets = Object.keys(fields).map((key) => ({
              label: fields[key].name,
              value: `${contentVariable.value}.${
                isCamelCase(fields[key].id) ? `"${dasherize(underscore(fields[key].id))}"` : fields[key].id
              }`
            }));
            setContentModelSnippets(snippets);
          }
        }
      }
    }
  }, [contentTypes, contentType, mode, item]);

  const disableEdit = !item || (item.stateMap.locked && item.lockOwner !== user.username);

  const {
    palette: { type }
  } = useTheme();

  useEffect(() => {
    if (item && content === null) {
      setLoading(true);
      fetchContentXML(site, item.path, { ...(!item.lockOwner && { lock: true }) }).subscribe((xml) => {
        setContent(xml);
        setLoading(false);
      });
    }
  }, [site, item, setContent, content]);

  useUnmount(onClosed);

  const onEditorChanges = () => {
    dispatch(
      updateCodeEditorDialog({
        pendingChanges: content !== editorRef.current.getValue()
      })
    );
  };

  const save = (unlock: boolean = true) => {
    writeContent(
      site,
      getParentPath(item.path),
      user.username,
      item.label,
      editorRef.current.getValue(),
      unlock
    ).subscribe(
      (response) => {
        dispatch(
          showSystemNotification({
            message: formatMessage(translations.saved)
          })
        );
      },
      ({ response }) => {
        dispatch(showErrorDialog({ error: response }));
      }
    );
  };

  const onCancel = () => {
    onClose();
  };

  const onSave = () => {
    save();
    setContent(editorRef.current.getValue());
  };

  const onSaveAndMinimize = () => {
    save(false);
    setContent(editorRef.current.getValue());
    onMinimized();
  };

  const saveAndClose = () => {
    save(false);
    onClose();
  };

  const onAddSnippet = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeSnippets = () => {
    setAnchorEl(null);
  };

  const onSnippetSelected = (snippet: { label: string; value: string }) => {
    const cursorPosition = editorRef.current.getCursorPosition();
    editorRef.current.session.insert(cursorPosition, snippet.value);
    closeSnippets();
  };

  return (
    <>
      <DialogHeader
        title={item ? item.label : <Skeleton width="120px" />}
        onDismiss={onClose}
        rightActions={[
          {
            icon: 'MinimizeIcon',
            onClick: onMinimized
          }
        ]}
      />
      <DialogBody className={classes.dialogBody}>
        <ConditionalLoadingState isLoading={loading} classes={{ root: classes.loadingState }}>
          <AceEditor
            theme={`ace/theme/${type === 'light' ? 'chrome' : 'tomorrow_night'}`}
            ref={editorRef}
            mode={`ace/mode/${mode}`}
            value={content ?? ''}
            onChange={onEditorChanges}
            readOnly={disableEdit || readonly}
          />
        </ConditionalLoadingState>
      </DialogBody>
      {!readonly && (
        <DialogFooter>
          <Button onClick={onAddSnippet} endIcon={<ExpandMoreRoundedIcon />} className={classes.addSnippet}>
            <FormattedMessage id="codeEditor.addCode" defaultMessage="Insert Code" />
          </Button>
          <SecondaryButton onClick={onCancel}>
            <FormattedMessage id="words.cancel" defaultMessage="Cancel" />
          </SecondaryButton>
          <SplitButton
            disabled={disableEdit}
            options={[
              { label: formatMessage(translations.save), callback: onSave },
              { label: formatMessage(translations.saveAndClose), callback: saveAndClose },
              { label: formatMessage(translations.saveAndMinimize), callback: onSaveAndMinimize }
            ]}
          />
        </DialogFooter>
      )}
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeSnippets}>
        {contentModelSnippets && (
          <ListSubheader disableSticky={true}>
            <FormattedMessage id="codeEditor" defaultMessage="Content model" />
          </ListSubheader>
        )}
        {contentModelSnippets?.map((snippet, i) => (
          <MenuItem key={i} onClick={() => onSnippetSelected(snippet)}>
            {snippet.label}
          </MenuItem>
        ))}
        <ListSubheader>
          <FormattedMessage id="words.snippets" defaultMessage="Snippets" />
        </ListSubheader>
        {Object.values(snippets).map((snippet, i) => (
          <MenuItem key={i} onClick={() => onSnippetSelected(snippet)}>
            {snippet.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}